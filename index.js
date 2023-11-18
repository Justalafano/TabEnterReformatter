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
        //push the column value into an array of arrays
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
        //console.table(columnArray);

        //determine the largest amount of characters appearing in each column
        function calculateMaxOfEachColumn()
        {
            //iterate through each cell value for a column and insert the lengths into
            // columnStingslengths array
            for (let column = 0; column < columnArray.length; column++)
            {
                for (let cell = 0; cell < columnArray[0].length; cell++)
                {
                    columnStringLength.push(columnArray[column][cell].length);
                    console.log(columnStringLength);
                }
            }
                // let maxCharPerColumn = Math.max.apply(null, columnStringLength);
                let maxCharPerColumn = Math.max(...columnArray[]);//es6 spread operator
               // console.log('maxCharPerColumn' , maxCharPerColumn);
                columnMax.push(maxCharPerColumn);
                displayValueOutput(columnMax[row], cellValue[row]);
                if (cellValue.length >= columnArray.length)
                {
                    columnStringLength = [];
                    cellValue = [];
                }
            
        }
        let columnMax = [];
        let columnStringLength = [];
        

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