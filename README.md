# TabEnterReformatter
A webpage where users can paste their SQL outputs or Excel data, (This should handle anything that uses tab delimiters between the columns and Carriage Returns - CRLF ) and the data will be reformatted with underscores to right align each column.

example data copied from sql table:
```
id	name	zipcode	phone
0	Bill	90210	8585552485
1	Columbus	84101	9315552938
2	Sir Fredrick The Third	10011	8085553374
3	Jane	57493	9685551929
4	Jimothy	92106	2015552293
```

after formatting:
```
id	name	                zipcode	phone
0	Bill	                90210	8585552485
1	Columbus	            84101	9315552938
2	Sir Fredrick The Third	10011	8085553374
3	Jane	                57493	9685551929
4	Jimothy	                92106	2015552293
```