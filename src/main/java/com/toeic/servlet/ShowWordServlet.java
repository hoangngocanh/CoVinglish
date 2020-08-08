package com.toeic.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.toeic.dbconnect.ConnectionFactory;
import com.toeic.entity.Vocabulary;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;


public class ShowWordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int lessonID = 20;
		ConnectionFactory connectionFactory = new ConnectionFactory();
		ArrayList<Vocabulary> vocabList = connectionFactory.getWordByLesson(lessonID);
		if (!vocabList.isEmpty()) {
			resp.setCharacterEncoding("UTF8");
			resp.setContentType("application/json");
			PrintWriter out = resp.getWriter();
			Gson gson =  new GsonBuilder().disableHtmlEscaping().create();
			String objectToReturn = gson.toJson(vocabList);
			out.write(objectToReturn);
			out.flush();
		}  else {
			PrintWriter out = resp.getWriter();
			resp.setCharacterEncoding("UTF8");
			resp.setContentType("application/json");
			out.write("{\"check\":\"fail\"}");
			out.flush();
		}
	}


}
