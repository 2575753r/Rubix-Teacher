from beginnerMethod.matrixTransformer import *
from beginnerMethod.tests.TestResultCases import testUpCounterClockwise, testDownClockwise
from beginnerMethod.tests.TestResultCases.testDownClockwise import testResultDownClockwise
from beginnerMethod.tests.TestResultCases.testDownCounterClockwise import testResultDownCounterClockwise
from beginnerMethod.tests.TestResultCases.testRightClockwise import testResultRightClockwise
from beginnerMethod.tests.TestResultCases.testUpClockwise import testCaseUpClockwise
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
if testCaseUpClockwise == testUpClockwise:
    print('Up clockwise test passed')
else:
    print("Up clockwise test failed")

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
    printCube(testCaseRightClockwise)

testRightCounterClockwise = testCase.copy()
testCaseRightClockwise = rotate_right_counterclockwise(testRightCounterClockwise)

# right counter clockwise test
if testCaseRightClockwise == testResultRightClockwise:
    print('Right clockwise test passed')

else:
    print("Right clockwise test failed")
    printCube(testCaseRightClockwise)

testRightCounterclockwise = testCase.copy()
