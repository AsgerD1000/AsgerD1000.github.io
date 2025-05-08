import json
OG = []

def change_format(file1=None, file2=None):
    file1 = file1 or "microsoft-fonts.json"
    file2 = file2 or "microsoft-fonts-newandimproved.json"
    try:
        with open(file1) as file:
            file = file.read()
            for i in json.loads(file)['fonts']['preinstalled']:
                if OG == []:
                    OG.append(i['fontFamily'])
                if OG[len(OG) - 1] != i['fontFamily']:
                    OG.append(i['fontFamily'])
    except FileNotFoundError:
        print('FILE NOT FOUND!')


    try:
        with open(file2, 'w') as newfile:
            json.dump(OG, newfile)
    except FileNotFoundError:
        print('FILENOTFOUND error try again in the new file name')
        print(file2)

def compare_json(file1, file2, result):
    with open('file1', 'r') as file1:
        with open('file2', 'r') as file2:
            if len(file1.read()) >= len(file2.read()):
                biggerfile = json.loads(file1.read())
                smallerfile = json.loads(file2.read())
            else:
                biggerfile = json.loads(file2.read())
                smallerfile = json.loads(file1.read())
            resultlist = []
            for font in smallerfile:
                if font in biggerfile:
                    resultlist.append(font)
            json.dump(resultlist,result)


if __name__ == "__main__":
    print('what would you like to do? \n 1: reformat json \n 2: compare json')
    if input('') == '1':
        print('')
        a = input('What is the origin file name? ')
        print('')
        b = input('What is the new file name? ')
        change_format(a,b)
        