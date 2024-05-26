import csv
import os
import json

def find_duplicates(folder_path):
    # Dictionary to store unique entries
    unique_entries = {}

    # Iterate through each CSV file in the folder
    for filename in os.listdir(folder_path):
        if filename.endswith(".csv"):
            filepath = os.path.join(folder_path, filename)
            with open(filepath, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    # Extract necessary information from the row
                    track_uri = row["Track URI"]
                    track_name = row["Track Name"]
                    artist_uris = [uri.strip() for uri in row["Artist URI(s)"].split(",")]
                    artist_names = [name.strip() for name in row["Artist Name(s)"].split(",")]
                    album_image_url = row["Album Image URL"]

                    # Check if track URI already exists in unique entries
                    if track_uri not in unique_entries:
                        unique_entries[track_uri] = {
                            "track_name": track_name,
                            "track_uri": track_uri,
                            "artists": artist_names,
                            "artist_uris": artist_uris,
                            "album_image_url": album_image_url
                        }
                    else:
                        # If track URI already exists, append artists if not already present
                        for artist_uri, artist_name in zip(artist_uris, artist_names):
                            if artist_uri not in unique_entries[track_uri]["artist_uris"]:
                                unique_entries[track_uri]["artist_uris"].append(artist_uri)
                                unique_entries[track_uri]["artists"].append(artist_name)

    return unique_entries.values()

def main():
    folder_path = "./csvs"
    unique_entries = find_duplicates(folder_path)

    # Convert the dictionary to JSON format
    json_data = json.dumps(list(unique_entries), indent=4)

    # Write JSON data to a file
    with open("unique_tracks.json", "w") as json_file:
        json_file.write(json_data)

if __name__ == "__main__":
    main()
