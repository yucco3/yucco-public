import re

def re_test(str):
    if(re.match("^abc", str)): print(f"{str} is match(^abc)")

re_test("abcde")
re_test("acde")
re_test("abdc")