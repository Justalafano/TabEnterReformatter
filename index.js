jQuery(document).ready(function() 
{
    $("#formForUglySql").submit(function(event)
    {
        event.preventDefault();
        
        ;//get the SQL statement
        let uglySql = $("#usersSqlStatement").val()

        let $answerField = $("#results1");

        //separate the rows of the SQL statement
        var rowArray = uglySql.split("\n");
        
        //iterate through each row saved in the rowArray
        //push the column value into an array of arrays
        var columnArray = [];
        for (let x of rowArray)
        {
            columnArray.push(x.split("\t"));
        }
        console.table(columnArray);
        let columnMax = [];
        let cellValue = [];
        let columnStringlength = [];

        for (let row = 0; row < columnArray.length; row++)
        {
            //iterate through the total number of columns and push the .length of 
            //each column value into the column1Stings array
            for (let column = 0; column < columnArray[0].length; column++)
            {
                cellValue.push(columnArray[column][row]);
                columnStringlength.push(cellValue[column].length);
            }
            // let maxCharPerColumn = Math.max.apply(null, columnStringlength);
            let maxCharPerColumn = Math.max(...columnStringlength);//es6 spread operator
            console.log('maxCharPerColumn' , maxCharPerColumn);
            columnMax.push(maxCharPerColumn);
            displayValueOutput(columnMax[row], cellValue[row]);
            if (cellValue.length >= columnArray.length)
            {
                columnStringlength = [];
                cellValue = [];
            }
        }

            //get the first element of array [0][0] and add whitespace up to the value columnMax[0] 
            
        function displayValueOutput(columnMax, cellValue)
        {
            let outputString = cellValue.toUpperCase();
            
            //Max string length to 25 chars
            if (columnMax > 25)
            {
                outputString.subString(0, 25);
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
        function addWhiteSpace(outputString, columnMax)
        {
            let numberOfSpacesToAdd = columnMax - outputString.length;
            let spaces = "";
            spaces = "&#95;".repeat(numberOfSpacesToAdd) + spaces;
            let rightJustifiedValue = spaces + outputString;
            $answerField.append("<div>" + rightJustifiedValue + "_" + "</div>") 

            moveToNextColumnCheck();
        }
        function moveToNextColumnCheck()
        {

        }
    })
})