/* New Student Service 

Script for adding a new student in Learn It CRM database.

Author: Rafael Brouzos, Software Engineer, Github: bronzeRaf, Email: rnm1816@gmail.com

Written in 4/5/2020

*/

/* This function creates the html GUI for the form of the New Student Service */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('forms.html').setTitle("New Student");
}

/* This function adds a student to the database. It is the implementation of the New Student Service 
Input: student details.

Result: new student record in the database, with automatic id (unique increament), password (unique random),
join date (current), deadline (one year later)
*/
function addStudentTodb(name, phone, email, university, faculty, year, comment, price, certification, gift, learnit) {
  
  try {
    //1HHwCv98ZQ9bJc0lIffs7hPMFyT_OJ2zYNP4Cr3TRnTs db
    //1fTHwZrmXkZQCmsdrD2dTatNlW6C34gmrMOCW085l3aQ test
    // Open File and Sheet
    var target = SpreadsheetApp.openById("1HHwCv98ZQ9bJc0lIffs7hPMFyT_OJ2zYNP4Cr3TRnTs");
    var target_sheet = target.getSheetByName("students");
    
    // Sort the sheet by id
    var range = target_sheet.getDataRange();
    range.sort({column: 1, ascending: false});
    
    // Find new id for the new record
    var r1 = target_sheet.getRange("A2:A2");
    var last_id = r1.getValue();
    var new_id = last_id+1;
    
    // Add an empty row and select it
    target_sheet.insertRowBefore(2);
    var target_range = target_sheet.getRange("A2:BB2");
    
    //Generate a password for the student
    var unique = 0;
    while(unique==0){
      var password = getRandomNumber(11111111, 99999999);
      var passwords = target_sheet.getRange(2, 38, target_sheet.getLastRow()).getValues();
      var searchResult = passwords.findIndex(password);
      if(searchResult == -1){
        unique = 1;
      }
    }
    
    // Receive current date
    var d = new Date()
    var date = Utilities.formatDate(d, "GMT+3", "dd/MM/yyyy")
    var deadline = Utilities.formatDate(new Date(d.getFullYear() +1, d.getMonth(), d.getDate()), "GMT+3", "dd/MM/yyyy")
    
    // Set up the values from the form
    var values = [
    [ new_id, name, phone, "", email, university, faculty, year, comment, "", "", price, 
    "", "", "", "", "", "", "", "", "", "", "", "", gift, certification, "", "", "", "", 
    "", "", "", "", "", "", "", password, "", "", "", learnit, date, deadline, 0, "", "", "", "", "", "" , "", "", 0]
    ];
    
    // Store the values to the sheet
    target_range.setValues(values);
    
    // Feedback
    return "OK";
    
  } catch (f) {
    return f.toString();
  }
  
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Array.prototype.findIndex = function(search){
  if(search == "") return false;
  for (var i=0; i<this.length; i++)
    if (this[i] == search) return i;

  return -1;
} 