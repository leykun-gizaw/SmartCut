function printDiv () {
  const divContents = document.getElementById('layouts').innerHTML;
  const a = window.open('', '', 'height=1000, width=1000');
  a.document.write('<html>');
  a.document.write('<head><link rel="stylesheet" type="text/css" href="css/style.css"></head>');
  a.document.write('<body><h1>Layouts</h1><br><hr>');
  a.document.write(divContents);
  a.document.write('</body></html>');
  a.document.close();
  a.print();
}
