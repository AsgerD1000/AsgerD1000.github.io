import json
OG = []

def change_format(file1=None, file2=None):
    file1 = file1 or "microsoft-fonts.json"
    file2 = file2 or "microsoft-fonts-newandimproved.json"
    try:
        with open(file1) as file:
            file = file.read()
            for i in json.loads(file)['items']:
                if OG == []:
                    OG.append(i['family'])
                if OG[len(OG) - 1] != i['family']:
                    OG.append(i['family'])
    except FileNotFoundError:
        print('FILE NOT FOUND!')


    try:
        with open(file2, 'w') as newfile:
            json.dump(OG, newfile)
    except FileNotFoundError:
        print('FILENOTFOUND error try again in the new file name')
        print(file2)

def compare_json(file1, file2, result):
    file1 = file1 or "microsoft-fonts.json"
    file2 = file2 or "google-fonts.json"
    result = result or 'microsoft-google.json'
    with open(file1, 'r') as f1, open(file2, 'r') as f2:
        file1_content = f1.read()
        file2_content = f2.read()

        # Check if either file is empty
        if not file1_content.strip() or not file2_content.strip():
            print("One of the files is empty or invalid JSON.")
            return

        # Parse JSON content
        biggerfile = json.loads(file1_content) if len(file1_content) >= len(file2_content) else json.loads(file2_content)
        smallerfile = json.loads(file2_content) if len(file1_content) >= len(file2_content) else json.loads(file1_content)

        # Compare and find common fonts
        resultlist = []
        for font in smallerfile:
            if font in biggerfile:
                print(f'{font}: succeded')
                resultlist.append(font)
            else:
                print(f'{font}: failed')

        # Write the result to the output file
        with open(result, 'w') as result_file:
            json.dump(resultlist, result_file)

if __name__ == "__main__":
    print('what would you like to do? \n 1: reformat json \n 2: compare json')
    if input('') == '1':
        print('')
        a = input('What is the origin file name? ')
        print('')
        b = input('What is the new file name? ')
        change_format(a,b)
    else:
        print('')
        a = input('What is the name of the first file to compare? ')
        b = input('What is the name of the second file to compare? ')
        c = input('What is the naem of the file with the results? ')
        compare_json(a,b,c)
