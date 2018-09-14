<%@page import="myPackage.FileReaderWriter"%>
<%@page import="java.util.Vector"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01                   
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>


 <%
Vector<String[]> v = new Vector<String[]>();
String[] name = {request.getParameter("name")};
String[] email = {request.getParameter("email")};
String[] str1 = {request.getParameter("c")};
v.addElement(c);


FileReaderWriter.saveVectorToFile(v, "MyTestFile.txt");
%>



<%

Vector<String[]> vec =          FileReaderWriter.readFileToVector     ("MyTestFile.txt");
for (int i = 0; i < vec.size(); i++) 
{
    out.print("|");
    for (int j = 0; j < vec.elementAt(i).length; j++) 
    {
        out.print(vec.elementAt(i)[j] + "|");
    }
%>
<br>
<%
}
%>

</body>
</html>