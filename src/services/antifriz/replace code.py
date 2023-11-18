import json
import io

##-------------------------------------------------------------------##
## This code replace tvgid string with channelid string & vice versa //
##-------------------------------------------------------------------##

input_file_path = r'src\services\antifriz\antifriz.json'
output_file_path = 'output.json'

# Load the JSON file with specified encoding
with io.open(input_file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Perform replacements
for item in data:
    item['channelId'], item['tvgId'] = item['tvgId'], item['channelId']

# Save the modified data to output.json
with io.open(output_file_path, 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print('File saved as outputReplaced.json')
