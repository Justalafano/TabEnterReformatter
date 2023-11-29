jQuery(document).ready(function() 
{
    $("#formForUglySql").submit(function(event)
    {
        event.preventDefault();
        
        //get the SQL statement
        let uglySql = $("#usersSqlStatement").val();

        //let $answerField = $("#results1");

        //separate the rows of the SQL statement
        var rowArray = uglySql.split("\n");
        
        //iterate through each row saved in the rowArray
        //push the row value into an array of arrays
        var columnArray = [];

        for (let x of rowArray)
        {
            columnArray.push(x.split("\t"));
        }
        //SETS THE MAX CHARACTERS FOR A COLUMN
        var characterArray = [];
        let max = 25;
        //concatenate a code block and a table element at the beginning of the clipboard string so the formatting appears in ServiceNow
        let clipboardString = "[code]<table>";
        //iterate through each row
        for (let y = 0; y < columnArray.length; y++) 
        {
            //at the start of each row, concatenate a row element to the clipboardString
            clipboardString += "<tr>";
            //at the start of each row, append a row element to the results1 table element
            $("#results1").append("<tr>"); 
            //iterate through each column of each row
            for (let z = 0; z < columnArray[y].length; z++)
            {
                // THIS CODE SETS A MAX AMOUNT OF CHARACTERS FOR A COLUMN
                characterArray.push(columnArray[y][z].split(''));
                if (columnArray[y][z].length > max) {
                    let shortened = '';
                    for (let w = 0; w < max; w++){
                        shortened += characterArray[(y*4)+z][w];
                        columnArray[y][z] = shortened; 
                    }
                }
                //if on the first row...
                if (y == 0){
                    //concatenate a table header element to the clipboardString
                    clipboardString += "<th style='text-wrap:nowrap'>" + columnArray[y][z] + "</th>";
                    //append a table header element to the results1 table element
                    $("#results1").append("<th style='text-wrap:nowrap'>" + columnArray[y][z] + "</th>");
                }
                //if not on the first row...
                if (y != 0){
                    //concatenate a table data cell element to the clipboardString
                    clipboardString += "<td>" + columnArray[y][z] + "</td>";
                    //append a table data cell element to the results1 table element
                    $("#results1").append("<td>" + columnArray[y][z] + "</td>");
                }   
            }
            //at the end of each row, concatenate a closing row element to the clipboardString
            clipboardString += "</tr>";
            //at the end of each row, append a closing row element to the results1 table element
            $("#results1").append("</tr>"); 
        }
        //concatenate a closing table element and a code block at the end of the clipboard string so the formatting appears in ServiceNow
        clipboardString += "</table>[code]";
        //Copy the clipboardString to the clipboard
        navigator.clipboard.writeText(clipboardString);

        /*const displayValueOutput = (columnMax, cellValue) => {
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
        }*/
    })
})