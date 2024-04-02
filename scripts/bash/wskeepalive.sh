#!/bin/bash
 
# Array of industries
industries=("Agriculture" "Apparel" "Banking" "Biotechnology" "Chemicals" "Communications" "Construction" "Consulting" "Education" "Electronics" "Energy" "Engineering" "Entertainment" "Environmental" "Finance" "Fintech" "Government" "Healthcare" "Hospitality" "Insurance" "Machinery" "Manufacturing" "Media" "Jewelry" "Recreation" "Retail" "Shipping" "Technology" "Telecommunications" "Transportation" "Utilities" )
 
# Index for the current industry
index=0
 
while true
do
    # Get the current industry
    industry=${industries[$index]}
 
    # Query the webservice
    curl "https://simplewsrust.onrender.com/$industry"
 
    # Wait for 30 seconds
    sleep 10
 
    # Move to the next industry
    index=$(( (index + 1) % ${#industries[@]} ))
done
