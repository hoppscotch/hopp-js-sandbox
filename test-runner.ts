import qjs from "quickjs-emscripten"

/**
 * Put test script here
 */
const testScript = `
  pw.test("hello", () => {
    pw.expect(10).toBe(10);
    pw.expect(10).not.toBe(10);
    pw.expect(10).toBe(10);
  });
`;

export type TestDescriptor = {
  /**
   * The name of the test block
   */
  descriptor: string;

  /**
   * Expectation results of the test block
   */
  expectResults: boolean[];

  /**
   * Children test blocks (test blocks inside the test block)
   */
  children: TestDescriptor[];
}


/**
 * Creates an Expectation object for use inside the sandbox
 * @param vm The QuickJS sandbox VM instance
 * @param expectVal The expecting value of the expectation
 * @param negated Whether the expectation is negated (negative)
 * @param currTestStack The current state of the test execution stack
 * @returns Handle to the expectation object in VM
 */
function createExpectation(vm: qjs.QuickJSVm, expectVal: any, negated: boolean, currTestStack: string | any[]): qjs.QuickJSHandle {
  const resultHandle = vm.newObject();

  const toBeFnHandle = vm.newFunction("toBe", (expectedValHandle) => {
    const expectedVal = vm.dump(expectedValHandle);

    let assertion = expectVal === expectedVal;
    if (negated) assertion = !assertion;

    currTestStack[currTestStack.length - 1].expectResults.push(assertion);

    return { value: vm.undefined };
  });

  vm.setProp(resultHandle, "toBe", toBeFnHandle);
  vm.defineProp(resultHandle, "not", {
    get: () => {
      return createExpectation(vm, expectVal, !negated, currTestStack);
    }
  })

  toBeFnHandle.dispose();

  return resultHandle;
}

export async function execTestScript(testScript: string): Promise<TestDescriptor[]> {
  const QuickJS = await qjs.getQuickJS();
  const vm = QuickJS.createVm();

  const pwHandle = vm.newObject();

  const testRunStack: TestDescriptor[] = [{ descriptor: "root", expectResults: [], children: [] }];

  const testFuncHandle = vm.newFunction("test", (descriptorHandle, testFuncHandle) => {
    const descriptor = vm.getString(descriptorHandle);

    testRunStack.push({
      descriptor,
      expectResults: [],
      children: []
    })

    const result = vm.unwrapResult(vm.callFunction(testFuncHandle, vm.null));
    result.dispose();

    const child = testRunStack.pop() as TestDescriptor;
    testRunStack[testRunStack.length - 1].children.push(child);
  });

  const expectFnHandle = vm.newFunction("expect", (expectValueHandle) => {
    const expectVal = vm.dump(expectValueHandle);

    return {
      value: createExpectation(vm, expectVal, false, testRunStack)
    };
  });

  vm.setProp(pwHandle, "expect", expectFnHandle);
  expectFnHandle.dispose();

  vm.setProp(pwHandle, "test", testFuncHandle);
  testFuncHandle.dispose();

  vm.setProp(vm.global, "pw", pwHandle);
  pwHandle.dispose();


  const evalRes = vm.evalCode(testScript);
  if (evalRes.error) {
    const errorData = vm.dump(evalRes.error);
    evalRes.error.dispose();

    throw errorData;
  }

  vm.dispose();

  return testRunStack;
}