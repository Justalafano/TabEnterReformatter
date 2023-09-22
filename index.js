jQuery(document).ready(function() 
{
    $("#formForUglySql").submit(function(event)
    {
        event.preventDefault();
        
        ;//get the SQL statement
        let uglySql = $("#usersSqlStatement").val()

        let $answerField = $("#results1");

        //separate the rows of the SQL statement
        let rowArray = uglySql.split("\n");
        
        //iterate through each row saved in the rowArray
        //push the column value into an array of arrays
        let columnArray = [];
        for (let x of rowArray)
        {
            columnArray.push(x.split("\t"));
        }

        let lengthMap = {}
        columnArray.forEach((row) => {
            row.forEach((col, j) => {
                // if the lengthMap doesn't have that key:value pair yet, or if the value is less than the current column length
                if (lengthMap[j] == null || lengthMap[j] < col.length) {
                    // create that key and set it's value to the length of the current column
                    lengthMap[j] = col.length
                }
            })
        })

        let output = ``
        columnArray.forEach((row) => {
            row.forEach((col, j) => {
                // don't include padding for the last column
                if (j == row.length - 1) {
                    output += col
                }
                else {
                    // padEnd adds the specified character to the end of the string until the string is the specified length
                    output += col.padEnd(lengthMap[j] + 1, '.')
                }
            })
            output += '\n'
        })
        // could use a style.css file instead of inline styling here
        // using es6 temlate literal string to insert the output instead of string concatenation
        // using a text area instead of a div so the \n formatting renders without having to deal with
        // adding <br> tags and other html formatting
        $answerField.append(`<textarea style='width:30%;height:30vh'>${output}</textarea>`)
    })
})