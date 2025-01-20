from beginnerMethod.matrixTransformer import *
from beginnerMethod.tests.TestResultCases import testUpCounterClockwise, testDownClockwise
from beginnerMethod.tests.TestResultCases.testCaseBackClockwise import testResultBackClockwise
from beginnerMethod.tests.TestResultCases.testCaseBackCounterclockwise import testResultBackCounterclockwise
from beginnerMethod.tests.TestResultCases.testCaseFrontClockwise import testResultFrontClockwise
from beginnerMethod.tests.TestResultCases.testCaseFrontCounterclockwise import testResultFrontCounterclockwise
from beginnerMethod.tests.TestResultCases.testDownClockwise import testResultDownClockwise
from beginnerMethod.tests.TestResultCases.testDownCounterClockwise import testResultDownCounterClockwise
from beginnerMethod.tests.TestResultCases.testLeftClockwise import testResultLeftClockwise
from beginnerMethod.tests.TestResultCases.testLeftCounterClockwise import testResultLeftCounterclockwise
from beginnerMethod.tests.TestResultCases.testRightClockwise import testResultRightClockwise
from beginnerMethod.tests.TestResultCases.testRightCounterclockwise import testResultRightCounterclockwise
from beginnerMethod.tests.TestResultCases.testUpClockwise import  testResultUpClockwise
from beginnerMethod.tests.TestResultCases.testUpCounterClockwise import testResultUpCounterClockwise

testCase = {
    "up": [
        ["w", "o", "o"],
        ["b", "y", "o"],
        ["y", "r", "y"]
    ],
    "left": [

        ["r", "y", "r"],
        ["o", "b", "y"],
        ["g", "r", "w"]
    ],
    "front": [
        ["g", "g", "b"],
        ["o", "r", "g"],
        ["b", "r", "b"]
    ],
    "right": [
        ["r", "g", "w"],
        ["w", "g", "g"],
        ["o", "w", "g"]
    ],
    "back": [
        ["b", "w", "g"],
        ["y", "o", "b"],
        ["o", "w", "o"]
    ],
    "down": [
        ["r", "y", "y"],
        ["b", "w", "r"],
        ["y", "b", "w"]
    ]
}

testUpClockwise = testCase.copy()
testCaseUpClockwise = rotate_up_clockwise(testUpClockwise)

# ClockwiseTest
if testResultUpClockwise == testCaseUpClockwise:
    print('Up clockwise test passed')
else:
    print("Up clockwise test failed")
    printCube(testCaseUpClockwise)

testUpCounterClockwise = testCase.copy()
testCaseUpCounterClockwise = rotate_up_counterclockwise(testUpCounterClockwise)

if testCaseUpCounterClockwise == testResultUpCounterClockwise:
    print('Up counter clockwise test passed')
else:
    print("Up counter clockwise test failed")

testDownClockwise = testCase.copy()
testCaseDownClockwise = rotate_down_clockwise(testDownClockwise)

if testCaseDownClockwise == testResultDownClockwise:
    print('Down clockwise test passed')
else:
    print("Down clockwise test failed")



testDownCounterClockwise = testCase.copy()
testCaseDownCounterClockwise = rotate_down_counterclockwise(testDownCounterClockwise)

if testCaseDownCounterClockwise == testResultDownCounterClockwise:
    print('Down counter clockwise test passed')
else:
    print("Down counter clockwise test failed")


testRightClockwise = testCase.copy()
testCaseRightClockwise = rotate_right_clockwise(testRightClockwise)

# right clockwise test
if testCaseRightClockwise == testResultRightClockwise:
    print('Right clockwise test passed')

else:
    print("Right clockwise test failed")

# right counter clockwise test

testRightCounterClockwise = testCase.copy()
testCaseRightCounterclockwise = rotate_right_counterclockwise(testRightCounterClockwise)

if testCaseRightCounterclockwise == testResultRightCounterclockwise:
    print('Right Counterclockwise test passed')

else:
    print("Right Counterclockwise test failed")

testRightCounterclockwise = testCase.copy()


testLeftClockwise = testCase.copy()
testCaseLeftClockwise = rotate_left_clockwise(testLeftClockwise)

if testCaseLeftClockwise == testResultLeftClockwise:
    print('Left clockwise test passed')

else:
    print("Left clockwise test failed")
    printCube(testCaseLeftClockwise)

testLeftCounterclockwise = testCase.copy()
testCaseLeftCounterclockwise = rotate_left_counterclockwise(testLeftCounterclockwise)

if testCaseLeftCounterclockwise == testResultLeftCounterclockwise:
    print('Left counterclockwise test passed')

else:
    print("Left counterclockwise test failed")
    printCube(testCaseLeftCounterclockwise)


# back
testBackClockwise = testCase.copy()
testCaseBackClockwise = rotate_back_clockwise(testBackClockwise)

if testCaseBackClockwise == testResultBackClockwise:
    print('Back clockwise test passed')

else:
    print("Back clockwise test failed")
    printCube(testCaseBackClockwise)

testBackCounterclockwise = testCase.copy()
testCaseBackCounterclockwise = rotate_back_counterclockwise(testBackCounterclockwise)

if testCaseBackCounterclockwise == testResultBackCounterclockwise:
    print('Back counterclockwise test passed')

else:
    print("Back counterclockwise test failed")
    printCube(testCaseBackCounterclockwise)

# front
testFrontClockwise = testCase.copy()
testCaseFrontClockwise = rotate_front_clockwise(testFrontClockwise)

if testCaseFrontClockwise == testResultFrontClockwise:
    print('Front clockwise test passed')

else:
    print("Front clockwise test failed")
    printCube(testCaseFrontClockwise)

testFrontCounterclockwise = testCase.copy()
testCaseFrontCounterclockwise = rotate_front_counterclockwise(testFrontCounterclockwise)

if testCaseFrontCounterclockwise == testResultFrontCounterclockwise:
    print('Front counterclockwise test passed')

else:
    print("Front counterclockwise test failed")
    printCube(testCaseFrontCounterclockwise)



