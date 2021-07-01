import qjs from "quickjs-emscripten"

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

  const toBeLevel2xxHandle = vm.newFunction("toBeLevel2xx", () => {
    let assertion = expectVal >= 200 && expectVal <= 299;
    if (negated) assertion = !assertion;
    
    currTestStack[currTestStack.length - 1].expectResults.push(assertion);
    return { value: vm.undefined };
  });

  const toBeLevel3xxHandle = vm.newFunction("toBeLevel3xx", () => {
    let assertion = expectVal >= 300 && expectVal <= 399;
    if (negated) assertion = !assertion;
    
    currTestStack[currTestStack.length - 1].expectResults.push(assertion);
    return { value: vm.undefined };
  });

  const toBeLevel4xxHandle = vm.newFunction("toBeLevel4xx", () => {
    let assertion = expectVal >= 400 && expectVal <= 499;
    if (negated) assertion = !assertion;
    
    currTestStack[currTestStack.length - 1].expectResults.push(assertion);
    return { value: vm.undefined };
  });

  const toBeLevel5xxHandle = vm.newFunction("toBeLevel5xx", () => {
    let assertion = expectVal >= 500 && expectVal <= 599;
    if (negated) assertion = !assertion;
    
    currTestStack[currTestStack.length - 1].expectResults.push(assertion);
    return { value: vm.undefined };
  });

  const toBeTypeHandle = vm.newFunction("toBeType", (expectedValHandle) => {
    const expectedType = vm.getString(expectedValHandle);
    let assertion = (typeof expectVal) === expectedType;
    if (negated) assertion = !assertion;

    currTestStack[currTestStack.length - 1].expectResults.push(assertion);
    return { value: vm.undefined };
  });

  const toHaveLengthHandle = vm.newFunction("toHaveLength", (expectedValHandle) => {
    const expectedLength = vm.getNumber(expectedValHandle);
    let assertion = (expectVal as any[]).length === expectedLength;
    if (negated) assertion = !assertion;

    currTestStack[currTestStack.length - 1].expectResults.push(assertion);
    return { value: vm.undefined };
  });

  vm.setProp(resultHandle, "toBe", toBeFnHandle);
  vm.setProp(resultHandle, "toBeLevel2xx", toBeLevel2xxHandle);
  vm.setProp(resultHandle, "toBeLevel3xx", toBeLevel3xxHandle);
  vm.setProp(resultHandle, "toBeLevel4xx", toBeLevel4xxHandle);
  vm.setProp(resultHandle, "toBeLevel5xx", toBeLevel5xxHandle);
  vm.setProp(resultHandle, "toBeType", toBeTypeHandle);
  vm.setProp(resultHandle, "toHaveLength", toHaveLengthHandle);

  vm.defineProp(resultHandle, "not", {
    get: () => {
      return createExpectation(vm, expectVal, !negated, currTestStack);
    }
  })

  toBeFnHandle.dispose();
  toBeLevel2xxHandle.dispose();
  toBeLevel3xxHandle.dispose();
  toBeLevel4xxHandle.dispose();
  toBeLevel5xxHandle.dispose();
  toBeTypeHandle.dispose();
  toHaveLengthHandle.dispose();

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