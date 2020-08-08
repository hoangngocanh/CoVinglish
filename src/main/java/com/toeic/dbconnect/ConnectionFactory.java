package com.toeic.dbconnect;

import com.toeic.entity.Lesson;
import com.toeic.entity.Vocabulary;

import java.sql.*;
import java.util.ArrayList;

public class ConnectionFactory {
    static final String URL = "jdbc:mysql://localhost:3306/word_600_toeic";
    static final String USER = "root";
    static final String PASSWORD = "123456789";
    private static Connection conn;
    private PreparedStatement ps;
    private ResultSet rs;
    //Table Vocabulary
    static final String ID = "id";
    static final String CATEGORY = "vocabularyCategory";
    static final String EXAMPLE_ENGLISH = "vocabularyExampleEnglish";
    static final String EXAMPLE_VIE = "vocabularyExampleVietnamese";
    static final String LESSON_ID = "lessonId";
    static final String PRONOUNCE = "vocabularyPronounce";
    static final String REMIND = "remind";
    static final String ENGLISH = "vocabularyEnglish";
    static final String VIETNAMESE = "vocabularyVietnameses";
    static final String FAVORITE = "isFavorite";

    //Table Lesson
    static final String LESSON_NAME_ENGLISH = "lessonNameEnglish";
    static final String LESSON_NAME_VIETNAMESE = "lessonNameVietnamese";


    private static Connection getJDBCConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public ConnectionFactory () {

    }

    public Lesson getLesson(int idLesson) {
        String sql = "SELECT * FROM Lesson WHERE id = ?";
        conn = getJDBCConnection();
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, idLesson+"");
            rs = ps.executeQuery();
            while (rs.next()) {
                return new Lesson(rs.getInt(ID), rs.getString(LESSON_NAME_ENGLISH), rs.getString(LESSON_NAME_VIETNAMESE));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
    public ArrayList<Vocabulary> getWordByLesson(int idLesson) {
        ArrayList<Vocabulary> list = new ArrayList<>();
        conn = getJDBCConnection();
        String nameLesson = getLesson(idLesson).getNameEnglish();
        String sql = "SELECT * FROM vocabulary WHERE LessonId = ?";
        try {
            ps = conn.prepareStatement(sql);
            ps.setString(1, idLesson+"");
            rs = ps.executeQuery();

            while (rs.next()) {
                Vocabulary vocabulary = new Vocabulary();
                vocabulary.setId(rs.getInt(ID));
                vocabulary.setCategory(rs.getString(CATEGORY));
                vocabulary.setExampleEnglish(rs.getString(EXAMPLE_ENGLISH));
                vocabulary.setExampleVietnamese(rs.getString(EXAMPLE_VIE));
                vocabulary.setLessonId(rs.getInt(LESSON_ID));
                vocabulary.setPronounce(rs.getString(PRONOUNCE));
                vocabulary.setRemind(rs.getInt(REMIND));
                vocabulary.setEnglish(rs.getString(ENGLISH));
                vocabulary.setVietnamese(rs.getString(VIETNAMESE));
                vocabulary.setIsFavorite(rs.getInt(FAVORITE));
                vocabulary.setNameLesson(nameLesson);
                list.add(vocabulary);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return list;
    }

//    public static void main( String [] args) {
//        Connection conn = getJDBCConnection();
//        if (conn != null) {
//            System.out.println("Success");
//        } else {
//            System.out.println("Not access");
//        }
//        ConnectionFactory connectionFactory = new ConnectionFactory();
//        ArrayList<Vocabulary> list = connectionFactory.getWordByLesson(2);
//
//        for (Vocabulary vocabulary : list) {
//            System.out.println("Viet: "+vocabulary.getExampleVietnamese());
//        }
//
//    }
}
