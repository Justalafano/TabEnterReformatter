jQuery(document).ready(function () 
{
    $("#formForUglySql").submit(function (event)
    {
        //clear any tables already displaying on the browser page
        $('#results1').empty();
        event.preventDefault();

        let uglySql = $("#usersSqlStatement").val();
        //Separate the rows of the SQL statement by the new line special character.(CRLF)
        let rowArray = uglySql.split("\n");
        let columnArray = [];
        let clipboardString = "[code]<table style='border:1px solid'>";
        /*
        Uncomment these variables if you want to set up max characters in column. (See for loop below.)
        var characterArray = [];
        let max = 25;
        */
        const divInsertion = document.getElementById("resultsDiv");
        divInsertion.innerHTML = "Your Formatted SQL Results Here";
        //iterate through each row saved in the rowArray
        //push the row value into an array of arrays
        for (let x of rowArray)
        {
            columnArray.push(x.split("\t"));
        }
        for (let y = 0; y < columnArray.length; y++) 
        {
            clipboardString += "<tr>";
            $("#results1").append("<tr>");
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
                if (y == 0)
                {
                    clipboardString += "<th style='text-wrap:nowrap; border:1px solid; text-align:center; font-weight: bold'>" + columnArray[y][z] + "</th>";
                    $("#results1").append("<th style='text-wrap:nowrap; border:1px solid; text-align:center; font-weight:bold'>" + columnArray[y][z] + "</th>");
                }
                //if not on the first row...
                if (y != 0)
                {
                    clipboardString += "<td style='border:1px solid'>" + columnArray[y][z] + "</td>";
                    $("#results1").append("<td style='border:1px solid'>" + columnArray[y][z] + "</td>");
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