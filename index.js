jQuery(document).ready(function () 
{
    $("#formForUglySql").submit(function (event)
    {
        event.preventDefault();

        let uglySql = $("#usersSqlStatement").val();

        //Separate the rows of the SQL statement by the new line special character.(CRLF)
        var rowArray = uglySql.split("\n");

        var columnArray = [];

        /*
        Uncomment these variables if you want to set up max characters in column. (See for loop below.)
        var characterArray = [];
        let max = 25;
        */

        let clipboardString = "[code]<table style='border:1px solid'>";
        //iterate through each row saved in the rowArray
        //push the row value into an array of arrays
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
            clipboardString += "<tr>";
            $("#results1").append("<tr>");
            console.log($("#results1"));
            //iterate through each column of each row
            for (let z = 0; z < columnArray[y].length; z++)
            {
                /* THIS CODE SETS A MAX AMOUNT OF CHARACTERS FOR A COLUMN, uncomment this and the variables above
                if you want to set a max amound of characters per column.
                characterArray.push(columnArray[y][z].split(''));
                if (columnArray[y][z].length > max) {
                    let shortened = '';
                    for (let w = 0; w < max; w++){
                        shortened += characterArray[(y * columnArray[y].length) + z][w];
                        columnArray[y][z] = shortened; 
                    }
                }*/
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
            clipboardString += "</tr>";
            $("#results1").append("</tr>");
        }
        clipboardString += "</table>[code]";
        //Copy the clipboardString to the clipboard
        navigator.clipboard.writeText(clipboardString);
    })
})