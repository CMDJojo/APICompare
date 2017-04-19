## APICompare

This javascript code fetches two api:s in json format from two different web servers and compares all the values that has the same name. Pirmary made to compare two CSGO skin price lists, as the CSGOFast price list and the Steamapi.io price list.

## Results, and input/output

You will enter two url:s that leads to json files of objects with different numeric values. The names should be the same on the two price lists, at least some names. The script will compare the values with the same name, and print the difference in the console. Then, all the items will be sorted and put into a document called differenceList.json, aswell as some statistics about how many items that had the same value.

## Installation

You have to have Node.js, and you have to do this:

    npm install fs
    npm install request
 Then you can run the bot using:
 

    node apiCompare.js

  
## Setup
There is not much to setup. The only thing you need to setup is the different API links. Open the apiCompare.js file, and on the top two rows you will find

    const api1 = ""
    const api2 = ""
Put two urls in those constants, and you will be ready to fire up the script!

## Tests

You can use this with any two website-based api:s written in json, that shares the same names and has numberic values. The script is specific used for comparing price lists valuing skins on Steam. Some example price lists are:

    https://api.csgofast.com/price/all
    https://api.steamapi.io/market/prices/730?key= (followed by your key from steamapi.io)
