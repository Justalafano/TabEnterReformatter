jQuery(document).ready(function() 
{
    $("#formForUglySql").submit(function(event)
    {
        event.preventDefault();
        
        //get the SQL statement
        let uglySql = $("#usersSqlStatement").val();

        let $answerField = $("#results1");

        //separate the rows of the SQL statement
        var rowArray = uglySql.split("\n");
        
        //iterate through each row saved in the rowArray
        //push the row value into an array of arrays
        var columnArray = [];

        const displayValueOutput = (columnMax, cellValue) => {
            let outputString = cellValue.toUpperCase();
            
            //Max string length to 25 chars
            if (columnMax > 25)
            {
                outputString.substring(0, 25);
                columnMax = 25;
            }
            
            if (outputString.length == columnMax)
            {
                $answerField.append("<div>" + outputString + "_" + "</div>") 
            
                moveToNextColumnCheck();
            }
            else
            {
                addWhiteSpace(outputString , columnMax);
            }
        }

        for (let x of rowArray)
        {
            columnArray.push(x.split("\t"));
        }

        //determine the largest amount of characters appearing in each column

        let columnMax = [];
        let columnStringLength = [];
        let maxCharPerColumn = [];
        //iterate through each cell value for a column and insert the lengths into
        // columnStingslengths array
        for (let row = 0; row < columnArray[0].length; row++)
        {
            for (let column = 0; column < columnArray.length; column++)
            {
                columnStringLength.push(columnArray[column][row].length);
            }
            maxCharPerColumn = Math.max(...columnStringLength);//es6 spread operator
            columnMax.push(maxCharPerColumn);
            maxCharPerColumn = [];
            columnStringLength = [];
        }
        console.log(columnMax);
        //Start here next. I have gotten the max amount of characters that would appear in each column.
        //Use these values to start adjusting each column.
                if (cellValue.length >= columnArray.length)
                {
                    columnStringLength = [];
                    cellValue = [];
                }
            
        

            //get the first element of array [0][0] and add whitespace up to the value columnMax[0] 
            
 
        function addWhiteSpace(outputString, columnMax)
        {
            let numberOfSpacesToAdd = columnMax - outputString.length;
            let spaces = "";
            spaces = "&#95;".repeat(numberOfSpacesToAdd) + spaces;
            let rightJustifiedValue = spaces + outputString;
            $answerField.append("<div>" + rightJustifiedValue + "_" + "</div>") 

            moveToNextColumnCheck();
        }
    })
})