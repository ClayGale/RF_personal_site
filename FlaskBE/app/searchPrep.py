import sys, os, json
#searchIndex takes in a file reference and load its json
#it will iterate through these values to get a list of relevant words for each entry
def searchIndex(file): 
    results = {}
    with open(file) as Data:
        dataSet = json.load(Data)

        for entry in dataSet:
            results[entry] = []

            #each entry contains a skills array, here i check if it is not empty and then pop it
            #the skills are added to the results dict first so they are hit first when searching
            if dataSet[entry].get('skills', 0):
                skills = dataSet[entry].pop('skills')
                for skill in skills:
                    results[entry].append(skill)
            
            for value in dataSet[entry]:
                print(value)
                    #for value in entry[1].items():
                #print(value)
                #print("\n")
        print(results)


    return results