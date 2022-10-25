from multiprocessing import Array
# from memory_profiler import profile
# from memory_profiler import memory_usage

from subprocess import TimeoutExpired, check_output

import cProfile
import gc
import multiprocessing
import os
import resource
import subprocess
from subprocess import Popen, PIPE, STDOUT
import sys
import time


class CorrectSolution:
    def addTwoNums(self, a: int, b: int):
        return a + b


def sol(start_num):
    everything = []
    for i in range(start_num):
        everything.append(i)


def profile_sol(start_num):
    start1 = time.process_time()
    sol(start_num)
    end1 = time.process_time()

    start2 = time.process_time()
    mem_usage = memory_usage((sol, (start_num,)))
    end2 = time.process_time()
    print('For '+str(start_num)+': '+str(end1 - start1) +
          '/'+str(end2 - start2)+'/'+str(max(mem_usage)))


def run_test_case(input_path, output_path, to_return):
    # set memory limit to 256MB
    _, hard = resource.getrlimit(resource.RLIMIT_AS)
    resource.setrlimit(resource.RLIMIT_AS, (256000000, hard))

    # get input and output
    input_file = open(input_path, "r")
    output_file = open(output_path, "r")
    input_text = input_file.read()
    correct_output = output_file.read()

    # run solution file
    start_data = resource.getrusage(resource.RUSAGE_CHILDREN)
    popen = Popen([sys.executable, 'solution.py'], stdin=PIPE,
                  stdout=PIPE, stderr=STDOUT, encoding='utf-8')
    timed_out = False
    try:
        stdout, _ = popen.communicate(input_text, timeout=8)
    except TimeoutExpired:
        popen.kill()
        stdout, _ = popen.communicate()
        to_return[0] = 2.0
        return
    # except:
    #    popen.kill()
    #    stdout, stderr = popen.communicate()
    #    print('test case '+str(test_num)+' runtime error')
    #    no_exceptions = False
    end_data = resource.getrusage(resource.RUSAGE_CHILDREN)

    # check output
    if (stdout == correct_output):
        to_return[0] = 0.0
        to_return[1] = round(end_data.ru_utime - start_data.ru_utime, 3)
        to_return[2] = round(end_data.ru_maxrss / 1000.0, 1)
        return
    else:
        if popen.returncode != 0 and not timed_out:
            if 'MemoryError' in stdout:
                to_return[0] = 3.0
            else:
                to_return[0] = 4.0
        else:
            to_return[0] = 1.0

    # close files
    input_file.close()
    output_file.close()

    #p = multiprocessing.Process(target=profile_sol, name="Solution", args=args)
    # p.start()
    # p.join(60)  # Wait a maximum of 60 seconds for foo
    # if p.is_alive():  # If thread is active
    #    print("foo is running... let's kill it...")
    #    p.terminate()
    #    p.join()


if __name__ == '__main__':
    # set max memory to 50MB, hopefully it's enough
    # for i in range(10):
    #    count = 1
    #    for j in range(i):
    #        count = count * 10
    #    test_sol(sol, (count,))
    test_result = "Accepted"
    test_num = 0
    while (True):
        # make relevant folder paths and check if they exist
        folder_path = os.path.join('tests', str(test_num))
        input_path = os.path.join(folder_path, 'input.txt')
        output_path = os.path.join(folder_path, 'output.txt')
        if ((not os.path.isdir(folder_path)) or (not os.path.isfile(input_path)) or (not os.path.isfile(output_path))):
            break

        return_array = Array('f', 3)
        return_array[0] = -1
        p = multiprocessing.Process(
            target=run_test_case, args=(input_path, output_path, return_array))
        p.start()
        p.join(2)
        if p.is_alive():
            print('murder')
            p.terminate()
            p.join()

        result = return_array[0]
        time_taken = return_array[1]
        memory_used = return_array[2]
        if result == 0:
            print('test case '+str(test_num+1)+' correct! ' +
                  str(time_taken)+' s / '+str(memory_used)+' MB')
        elif result == 1:
            print('test case '+str(test_num+1)+' incorrect')
            test_result = "Wrong Answer"
        elif result == 2:
            print('test case '+str(test_num+1)+' timed out')
            test_result = "Time Limit Exceeded"
        elif result == 3:
            print('test case '+str(test_num+1)+' ran out of memory')
            test_result = "Memory Limit Exceeded"
        elif result == 4:
            print('test case '+str(test_num+1)+' had a runtime exception')
            test_result = "Runtime Error"
        else:
            print('test case '+str(test_num+1)+' messed up, it was on me')
            test_result = "System Error"
        test_num = test_num + 1
    print(test_result, end="")
