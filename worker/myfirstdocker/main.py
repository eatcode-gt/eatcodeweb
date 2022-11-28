from multiprocessing import Array
# from memory_profiler import profile
# from memory_profiler import memory_usage

from subprocess import TimeoutExpired

import multiprocessing
import os
import resource
import subprocess
from subprocess import Popen, PIPE, STDOUT
import sys


def run_test_case(solution, solution_folder, input_path, output_path, to_return):
    # set memory limit to 2GB
    _, hard = resource.getrlimit(resource.RLIMIT_AS)
    resource.setrlimit(resource.RLIMIT_AS, (2048000000, hard))

    # get input and output
    input_file = open(input_path, "r")
    output_file = open(output_path, "r")
    input_text = input_file.read()
    correct_output = output_file.read()

    # run solution file
    run_command = []
    time_limit = 8
    if solution.endswith('.py'):
        run_command = [sys.executable, os.path.join(solution_folder, solution)]
        time_limit = 4
    elif solution.endswith('.class'): # compiled java class file
        run_command = ["java", "-classpath", solution_folder, solution[:(len(solution)-6)]]
        time_limit = 2

    start_data = resource.getrusage(resource.RUSAGE_CHILDREN)
    popen = Popen(run_command, stdin=PIPE, stdout=PIPE, stderr=STDOUT, encoding='utf-8')
    try:
        stdout, _ = popen.communicate(input_text, timeout=time_limit)
    except TimeoutExpired:
        popen.kill()
        stdout, _ = popen.communicate()
        to_return[0] = 2.0
        return
    end_data = resource.getrusage(resource.RUSAGE_CHILDREN)

    # check output
    if (stdout == correct_output):
        to_return[0] = 0.0
        to_return[1] = round(end_data.ru_utime - start_data.ru_utime, 3)
        to_return[2] = round(end_data.ru_maxrss / 1000.0, 1)
        return
    else:
        if popen.returncode != 0:
            if 'MemoryError' in stdout:
                to_return[0] = 3.0
            else:
                to_return[0] = 4.0
        else:
            to_return[0] = 1.0

    # close files
    input_file.close()
    output_file.close()


# TODO pass the language to this python file from the js
if __name__ == '__main__':
    # set max memory to 50MB, hopefully it's enough
    # for i in range(10):
    #    count = 1
    #    for j in range(i):
    #        count = count * 10
    #    test_sol(sol, (count,))
    # test_result = "Accepted"
    test_result = 0
    test_num = 0

    while (True):
        # make relevant folder paths and check if they exist
        folder_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tests', str(test_num))
        input_path = os.path.join(folder_path, 'input.txt')
        output_path = os.path.join(folder_path, 'output.txt')
        if ((not os.path.isdir(folder_path)) or (not os.path.isfile(input_path)) or (not os.path.isfile(output_path))):
            break

        return_array = Array('f', 3)
        return_array[0] = -1
        p = multiprocessing.Process(
            target=run_test_case, args=(solution, solution_folder, input_path, output_path, return_array))
        p.start()
        p.join(8)
        if p.is_alive():
            print('murder')
            p.terminate()
            p.join()
            return_array[0] = 2.0

        result = return_array[0]
        time_taken = return_array[1]
        memory_used = return_array[2]
        # if result == 0:
        #     print('test case '+str(test_num+1)+' correct! ' +
        #           str(time_taken)+' s / '+str(memory_used)+' MB')
        # elif result == 1:
        #     print('test case '+str(test_num+1)+' incorrect')
        #     test_result = "Wrong Answer"
        # elif result == 2:
        #     print('test case '+str(test_num+1)+' timed out')
        #     test_result = "Time Limit Exceeded"
        # elif result == 3:
        #     print('test case '+str(test_num+1)+' ran out of memory')
        #     test_result = "Memory Limit Exceeded"
        # elif result == 4:
        #     print('test case '+str(test_num+1)+' had a runtime exception')
        #     test_result = "Runtime Error"
        # else:
        #     print('test case '+str(test_num+1)+' messed up, it was on me')
        #     test_result = "System Error"
        result = int(result)
        if (result == 0):
            print(result, end=" ")
        elif (result >= 0 and result <= 4):
            print(result, end=" ")
            test_result = result
        else:
            print(5, end=" ")
            test_result = 5
        test_num = test_num + 1
    print(test_result, end="")
