package com.everbrilliant.j2se.file;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

public class TxtReader {

	/**
	 * 通过txt文件的路径获取其内容
	 * 
	 * @param filepath,encoding
	 * @return String
	 */
	public static String getString(String filepath,String encoding) {
		File file = new File(filepath);
		FileInputStream fileInputStream = null;
		InputStreamReader inputStreamReader = null;
		BufferedReader reader = null;
		StringBuffer sb = new StringBuffer("");
		
		try {
			fileInputStream = new FileInputStream(file);
			inputStreamReader = new InputStreamReader(fileInputStream, encoding);
			reader = new BufferedReader(inputStreamReader);
			
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
				sb.append("\n");
			}
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally{
			FileHelper.closeInStream(fileInputStream, reader);
			FileHelper.closeInStream(null, inputStreamReader);
		}
		
		return sb.toString();
	}
}
