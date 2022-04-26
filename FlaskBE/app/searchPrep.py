import json
# searchIndex takes in a file reference and load its json
# it will iterate through these values to get a list of relevant words for each entry
# at the end it returns the complete and unique word collection per entry 
# it also returns an array of skill entries to be used for the resume component in the front-end
def searchSet(file): 
    results = {}
    badChars = ['.',',','(',')','-',':',';','/'] # characters to be filtered from the processed data
    skillsList = [] # separating the skill entries to be passed separately for the resume
    with open(file) as Data:
        dataSet = json.load(Data)
        
        for entry in dataSet:
            results[entry] = []
            
            # each entry contains a skills array, here i check if it is not empty and then pop it
            # the skills are added to the results dict first so they are hit first when searching
            if dataSet[entry].get('skills', 0):
                skillSet = dataSet[entry].pop('skills')
                skillsList.append(skillSet) # passing a copy into skillsList for later use
                for skills in skillSet: # each skillset contains three groups which are checked for values
                    for skill in skills:
                        results[entry].append(skill.lower())
            
            entryValues = set() # this set is for containing all the unique words from each of the entrys items
            for value in dataSet[entry].items():
                valueCopy = value[1].lower()

                for badChar in badChars: # replacing characters that would mess with the data
                    if badChar in valueCopy:
                        valueCopy = valueCopy.replace(badChar,' ')

                entryValues.update(valueCopy.split()) # adding uniques of the cleaned words to the entryValues set 
        
            for value in entryValues: # adding all words with 3 or more letters (smaller ones probably aren't important)
                if len(value) > 2:
                    results[entry].append(value.lower())

    return [results, skillsList]

# resumePrep takes two arrays presently representing the compiled skills from my projects and education
# they will be collapsed into three categories containing two lists each
# these will be used to build front-end links to various projects(list 1) or classes (list 2) matching these skills
# category 1 = coding languages and frameworks, 2 = software, 3 = technical skills
def resumePrep(projectSkills, educationSkills):
    # this array of arrays of sets (lol) allows for the categorizing of unique values 
    # since the resume component in the front-end will have three categories with differentiation
    # between two types it seemed best to manipulate them in this structure. Sets are also quicker to add/remove/check values in
    resumeWorkingSets = [[set(),set()],[set(),set()],[set(),set()]]

    # these sets of loops are definitely inefficient on the surface but the inner loops are operating on
    # small datasets. The middle for loop always only runs three times. The inner runs on entries from arrays of size > 5
    for skillSet in projectSkills:
        for category,skills in enumerate(skillSet):
            for skill in skills:
                resumeWorkingSets[category][0].add(skill)
    
    for skillSet in educationSkills:
        for category,skills in enumerate(skillSet):
            for skill in skills:
                resumeWorkingSets[category][1].add(skill)

    # removing values in the education sets if they appear in the project sets.
    # the values are only needed once and they take priority as project values
    for category in resumeWorkingSets:
        for skill in category[1].copy():
            if skill in category[0]:
                category[1].remove(skill)
    #dumping the sets into a similar structure of arrays so it can be jsonified and passed to the front-end
    resumeListItems = {"Coding Languages & Frameworks":[[*resumeWorkingSets[0][0]],[*resumeWorkingSets[0][1]]],
                       "Software":[[*resumeWorkingSets[1][0]],[*resumeWorkingSets[1][1]]],
                       "Technical Skills":[[*resumeWorkingSets[2][0]],[*resumeWorkingSets[2][1]]]}
    
    return resumeListItems