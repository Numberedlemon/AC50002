"""
    IMPORTANT NOTICE:
    This file was created using python 3.10 to facilitate the use of match and case keywords. It will not compile in python versions < 3.10
    
    This file is also incredibly scuffed, you could call it cursed, and really should be written by someone much more competent than myself, but it eez what it eez.
    
    Algorithm for problem:
    > Create list of test names. DONE
    > Concatenate list to make sifting through easier. DONE
    > Use regex to get first letter DONE
    > Create every possible combination of three letters thereafter such that the abbreviation carries on in order. DONE
    > Score every abbreviation based on the position of its letters (Need to store position of letter and reference table value to get score.) DONE
    > Write abbreviation and score to file. DONE
    > Check file for duplicates and remove them. DONE
    
"""

import re ## python library for handling regular expressions.
import copy ## python library for making a deepcopy of the names list. This is acceptable so long as the list of test names is not egregiously long.

def concatNames(names):
    words = names
    for i in range(len(words)): ## stripping whitespace chars and forcing upper-case.
        words[i] = words[i].replace(" ", "").upper()
    return words
    
def getCharacterValues():
    values = open("values.txt", 'r')
    lines = values.readlines()

    lines = [line[:-1] for line in lines] 

    table = [line.split(',') for line in lines]
    return table

def getNames(filename):
    file = open(filename, "r") # open file with filename in write mode. This overwrites the current files contents.
    
    names = file.read().upper() # reads names and capitalises them, adding them to a list as a single item.
    
    nameList = names.split("\n") # splits the list on \n characters, such that each name is a separate list element.
    
    global unconcatNames
    unconcatNames = copy.deepcopy(nameList)
    
    global concatNames
    concatNames = concatNames(nameList)
    
    file.close() # closes file.
    
    return concatNames, unconcatNames

def getScore(letter):
    
    # get the value for each character in the alphabet.
    
    table = getCharacterValues()
    
    # init empty dict to store values.
    
    letterDict = {}

    # iterate over values in the list to make them key-value pairs in dict.

    for letterpair in table:
        letterDict[letterpair[0]] = letterpair[1:]
      
    return int("".join(letterDict.get(letter)))
    
        
def letterScore(longName, letter):
    
    first,last = longName.split()
    firstTerm = int(len(first)) - 1
    lastTerm = int(len(last)) - 1
    
    if re.search(letter, first) is not None:
        match re.search(letter,first).start():
            case 0 : return 0
            case 1 : return 1
            case 2 : return 2
            case int(firstTerm) : return 5
            case _ : return 3
    elif re.search(letter, last) is not None:
        match re.search(letter,last).start():
            case 0 : return 0
            case 1 : return 1
            case 2 : return 2
            case int(lastTerm) : return 5
            case _ : return 3
    else:
        print("Bad input, case not matched.")  
        
## Abbreviation Algorithm

def createAbbrevs(fileName):
    
    score = 0 # initialised local variables within function
    letterScoreA = 0
    letterScoreB = 0
    uniqueAbbrevs = [] # empty list to store unique abbreviations of names.
    names, longName = getNames(fileName) # reads the names from a given file, creates two lists, an unconcatenated list, and a concatenated one.
    
    file = open(fileName + "_output.txt", "w") # opens the output file in write mode
    for i in range(len(names)):
        x = re.findall(r'\b[a-zA-Z]', names[i]) ## using the regex to sift through the text strings and return an array containing the first letter of each word.
        
        for j in range(1,len(names[i])-1): ## Now when looping through we need to ignore the first character, as it has been caught by the regex.
            
            x.append(names[i][j])
            
            if (re.search(r'(?<=\w) (?=\w)', longName[i]).start() == j + 1) and (names[i][j] == "E"):
                letterScoreA = 20
            elif (re.search(r'(?<=\w) (?=\w)', longName[i]).start() == j + 1) and (names[i][j] != "E"):
                letterScoreA = 5
            elif letterScore(longName[i], names[i][j]) == 0:
                letterScoreA = 0
            else:
                letterScoreA = letterScore(longName[i], names[i][j]) + getScore(names[i][j])
            
            for k in range(j,len(names[i])): ## Looping for the third character, we need to ignore up to the j-th character, otherwise the abbrev. does not flow correctly.
                
                if(x[-1] == names[i][k]): ## removes duplicate characters.
                    continue
                x.append(names[i][k])
                
                if re.search(r'(?<=\w) (?=\w)', longName[i]).start() == k + 1 and names[i][k] == "E":
                    letterScoreB = 20
                elif re.search(r'(?<=\w) (?=\w)', longName[i]).start() == k + 1 and names[i][k] != "E":
                    letterScoreB = 5
                elif letterScore(longName[i], names[i][k]) == 0:
                    letterScoreB = 0
                else:
                    letterScoreB = letterScore(longName[i], names[i][k]) + getScore(names[i][k])
                
                score = letterScoreA + letterScoreB
                xString = "".join(x) # turns each array containing an abbreviation into a string.
                
                if xString not in uniqueAbbrevs:
                    uniqueAbbrevs.append(xString)
                    file.write(xString)
                    file.write(", %s\n" % score)
                    
                letterScoreB = 0

                x.pop()
                score = 0
                
            letterScoreA = 0        
            x.pop()
            
    file.close()         

#----------------------------------------------------------------------------------------------------------------------------#

# main driver code

if __name__ == "__main__":

    fileName = input("Please enter the file you wish to read from: (Please include file extension)")

    createAbbrevs(fileName)
