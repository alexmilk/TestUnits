var testResults = [];

function resetResults() {
    testResults = [];
}

function getResults() {
    var successCounter = 0;
    var totalCounter = testResults.length;
    testResults.forEach(function (testCase) {
        if (testCase.status === "Passed") successCounter++;
    });
    console.log(totalCounter + "/" + successCounter + " Passed");
}

function assertEqual(test, output) {
    var testCase = {
        "expected": test,
        "actual": output,
        "status": "Failed"
    };
    var result = (test === output);
    result ? testCase.status = 'Passed' : testCase.actual = result;
    testResults.push(testCase);
    return result;
}

function testMethod(method) {
    resetResults();
    console.log("Testing " + method.name);
    assertEqual(method(1), 1);
    assertEqual(method(3), "Fizz");
    assertEqual(method(5), "Buzz");
    assertEqual(method(11), 11);
    assertEqual(method(15), "FizzBuzz");
    getResults();
}

function fizzBuzzLiteral(numberToCheck) {
    if (numberToCheck % 3 === 0 && numberToCheck % 5 === 0) return "FizzBuzz";
    if (numberToCheck % 3 === 0) return "Fizz";
    if (numberToCheck % 5 === 0) return "Buzz";
    return numberToCheck;
}

function fizzBuzzVariable(numberToCheck) {
    var result = "";
    if (numberToCheck % 3 === 0) result += 'Fizz';
    if (numberToCheck % 5 === 0) result += 'Buzz';
    return result || numberToCheck;
}

function fizzBuzzInnerFunction(numberToCheck) {
    function isDivisible(input, divider) {
        return input % divider === 0;
    }

    var result = "";
    if (isDivisible(numberToCheck, 3)) result += "Fizz";
    if (isDivisible(numberToCheck, 5)) result += "Buzz";
    return result || numberToCheck;
}

function fizzBuzzCurried(numberToCheck) {
    function isDivisible(input, divider) {
        return input % divider === 0;
    }

    function getFizzBuzz(divider) {
        var result = "";
        if (isDivisible(numberToCheck, divider)) result += "Fizz";
        return function (secondDivider) {
            if (isDivisible(numberToCheck, secondDivider)) result += "Buzz";
            return result || numberToCheck;
        }
    }

    return getFizzBuzz(3)(5);
}

function fizzBuzzClass(numberToCheck) {
    function FizzBuzz(number) {
        this.input = number;
        this.fizz = "Fizz";
        this.buzz = "Buzz";
        this.result = "";

        this.getFizz = function () {
            if (isDivisible(this.input, 3)) this.result += this.fizz;
            return this;
        };

        this.getBuzz = function () {
            if (isDivisible(this.input, 5)) this.result += this.buzz;
            return this;
        };

        this.getResult = function () {
            return this.result || this.input;
        };

        function isDivisible(input, divider) {
            return (input % divider) === 0;
        }
    }

    var fizzBuzz = new FizzBuzz(numberToCheck);
    return fizzBuzz.getFizz().getBuzz().getResult();
}

function fizzBuzzInline(n) {
    return (!(n % 3) ? !(n % 5) ? "FizzBuzz" : "Fizz" : !(n % 5) ? "Buzz" : n);
}

testMethod(fizzBuzzLiteral);
testMethod(fizzBuzzVariable);
testMethod(fizzBuzzInnerFunction);
testMethod(fizzBuzzCurried);
testMethod(fizzBuzzClass);
testMethod(fizzBuzzInline);