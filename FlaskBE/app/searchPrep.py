import sys, os, json
#searchIndex takes in a file reference and load its json
#it will iterate through these values to get a list of relevant words for each entry
def searchIndex(file): 
    results = {}
    badChars = ['.',',','(',')','-',':'] # characters to be filtered from the processed data

    with open(file) as Data:
        dataSet = json.load(Data)
        
        for entry in dataSet:
            results[entry] = []

            #each entry contains a skills array, here i check if it is not empty and then pop it
            #the skills are added to the results dict first so they are hit first when searching
            if dataSet[entry].get('skills', 0):
                skills = dataSet[entry].pop('skills')
                for skill in skills:
                    results[entry].append(skill.lower())
            
            entryValues = set() # this set is for containing all the unique words from each of the entrys items
            for value in dataSet[entry].items():
                valueCopy = value[1].lower()
                for badChar in badChars: #replacing characters that would mess with the data
                    if badChar in valueCopy:
                        valueCopy = valueCopy.replace(badChar,' ')

                entryValues.update(valueCopy.split()) #adding uniques of the cleaned words to the entryValues set 
        
            for value in entryValues:
                if len(value) > 3:
                    results[entry].append(value)
        


    return results
