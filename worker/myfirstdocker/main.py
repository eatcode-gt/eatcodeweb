from multiprocessing import Array
# from memory_profiler import profile
# from memory_profiler import memory_usage

from subprocess import TimeoutExpired

import multiprocessing
from multiprocessing.sharedctypes import Value
import os
import resource
import subprocess
from subprocess import Popen, PIPE, STDOUT
import sys


def run_test_case(solution, input_path, output_path, return_value):
    try:
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
        if sys.argv[1] == 'python':
            # run_command = [sys.executable, os.path.join(solution_folder, solution)]
            run_command = [sys.executable, "solution.py"]
            time_limit = 4
        elif sys.argv[1] == 'java': # compiled java class file
            # run_command = ["java", "-classpath", solution_folder, solution[:(len(solution)-6)]]
            solution_vals = solution.split(" ")
            run_command = ["java", "-classpath", solution_vals[0], solution_vals[1]]
            time_limit = 2
        elif sys.argv[1] == 'cpp': # compiled java class file
            # run_command = ["java", "-classpath", solution_folder, solution[:(len(solution)-6)]]
            run_command = ["./Solution"]
            time_limit = 1

        start_data = resource.getrusage(resource.RUSAGE_CHILDREN)
        popen = Popen(run_command, stdin=PIPE, stdout=PIPE, stderr=STDOUT, encoding='utf-8')
        try:
            stdout, _ = popen.communicate(input_text, timeout=time_limit)
        except TimeoutExpired:
            popen.kill()
            stdout, _ = popen.communicate()
            return_value.value = 2
            return
        end_data = resource.getrusage(resource.RUSAGE_CHILDREN)
        
        # check output
        if (stdout == correct_output):
            return_value.value = 0
        else:
            if popen.returncode != 0:
                if 'MemoryError' in stdout:
                    return_value.value = 3
                else:
                    # print(stdout)
                    return_value.value = 4
            else:
                return_value.value = 1

        # close files
        input_file.close()
        output_file.close()
    except Exception as e:
        print(e)


# TODO pass the language to this python file from the js
if __name__ == '__main__':
    test_result = 0
    test_num = 0
    
    solution = "solution.py" # solution file
    if sys.argv[1] == 'java':
        for directory in os.listdir():
            if os.path.isdir(os.path.join(os.getcwd(), directory)):
                for dirpath, _, files in os.walk(directory):
                    for file in files:
                        if file.endswith('.java'):
                            subprocess.run(["javac", os.path.join(dirpath, file)])
                            solution = dirpath + " " + file[:(len(file)-5)]
    if sys.argv[1] == 'cpp':
        for dirpath, _, files in os.walk(os.getcwd()):
            for file in files:
                if file.endswith('.cpp'):
                    res = subprocess.run(["clang++", "-o", "Solution", os.path.join(dirpath, file)], stderr=PIPE)
                    if len(res.stderr) > 5:
                        for i in range(len(os.listdir(os.path.join(os.getcwd(), 'tests')))):
                            print(str(4), end=" ")
                        print(str(4), end="")
                        sys.exit()

    while (True):
        # make relevant folder paths and check if they exist
        folder_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tests', str(test_num))
        input_path = os.path.join(folder_path, 'input.txt')
        output_path = os.path.join(folder_path, 'output.txt')
        if ((not os.path.isdir(folder_path)) or (not os.path.isfile(input_path)) or (not os.path.isfile(output_path))):
            break

        return_value = Value('i', -1)
        p = multiprocessing.Process(
            target=run_test_case, args=(solution, input_path, output_path, return_value))
        p.start()
        p.join(8)
        if p.is_alive():
            p.terminate()
            p.join()
            return_value.value = 2

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
        if (return_value.value == 0):
            print(return_value.value, end=" ")
        elif (return_value.value >= 0 and return_value.value <= 4):
            print(return_value.value, end=" ")
            test_result = return_value.value
        else:
            print(5, end=" ")
            test_result = 5
        test_num = test_num + 1
    print(test_result, end="")
