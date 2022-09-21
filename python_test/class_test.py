from tkinter import N


class Book:
    def __init__(self, title) -> None:
        self.title = title

    def view(self):
        print(f"{self.title}")

class Comic(Book):
    def __init__(self, title, series) -> None:
        super().__init__(title)
        self.series = series
    
    def view(self):
        print(f"{self.title} / {self.series}")

class Magazine(Book):
    def __init__(self, title, month) -> None:
        super().__init__(title)
        self.month = month

    def view(self):
        print(f"{self.title} / {self.month}月号")

def process(title:str, series = None, month = None):
    if series == None and month == None:
        return Book(title= title)

    if series != None and month == None:
        return Comic(title= title, series= series)
    
    if month == None and month != None:
        return Magazine(title= title, month= month)

    raise ValueError("引数が多い")


def starMain():
    result :Book = process("Comicのタイトル", series= "series名")
    print(result.view())

starMain()