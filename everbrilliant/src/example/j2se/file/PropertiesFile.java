////////////////////////////////////////////////////////////////////////////
// 
// Copyright (C) 2009 e-Channels CORPORATION
// 
// ALL RIGHTS RESERVED BY e-Channels CORPORATION, THIS PROGRAM
// MUST BE USED SOLELY FOR THE PURPOSE FOR WHICH IT WAS  
// FURNISHED BY e-Channels CORPORATION, NO PART OF THIS PROGRAM
// MAY BE REPRODUCED OR DISCLOSED TO OTHERS, IN ANY FORM
// WITHOUT THE PRIOR WRITTEN PERMISSION OF e-Channels CORPORATION.
// USE OF COPYRIGHT NOTICE DOES NOT EVIDENCE PUBLICATION
// OF THE PROGRAM
// 
//			e-Channels CONFIDENTIAL AND PROPRIETARY
// 
////////////////////////////////////////////////////////////////////////////
// 
// $Log: PropertiesFile.java,v $
// Revision 1.1  2010/01/27 05:56:55  liangqiang
// init version
//
// 

package com.everbrilliant.j2se.file;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

/**
 * 
 * 获取*.properties（key=value集合）属性
 *
 */
public class PropertiesFile {

	/**
	 * 获取对应配置文件中指定key的value
	 * */
	public static String getResource(String configFile, String id) {
		ResourceBundle rb = getResources(configFile);
		return rb.getString(id);
	}
	
	/**
	 * 获取对应配置文件中指定key的value
	 * */
	public static String getProperty(String configFile, String id) {
		Properties prop = getProperties(configFile);
		return prop.getProperty(id);
	}

	/**
	 * 获取对应配置文件中指定key的value，可在获取时设置缺省值
	 * */
	public static String getProperty(String configFile, String id, String defaultValue) {
		Properties prop = getProperties(configFile);
		return prop.getProperty(id, defaultValue);
	}
	
	/**
	 * 获取对应配置文件中的所有 key = value 值对，ResourceBundle形式
	 * */
	public static ResourceBundle getResources(String configFile) {
		InputStream in = null;
		try {
			String fileName = null;
//			if (!configFile.startsWith("/")) {
//				fileName = LianaStandard.getRootPath() + "WEB-INF/" + configFile;
//			} else {
//				fileName = LianaStandard.getRootPath() + "WEB-INF" + configFile;
//			}

			in = new BufferedInputStream(new FileInputStream(fileName));
			ResourceBundle rb = new PropertyResourceBundle(in);
			return rb;

		} catch (FileNotFoundException fnfe) {
//			Trace.logWarning( Trace.COMPONENT_CORE, "资源文件[" + configFile + "]不存在", fnfe );
			return null;
		} catch (IOException ioe) {
//			Trace.logWarning( Trace.COMPONENT_CORE, "资源文件[" + configFile + "]读取出错", ioe );
			return null;
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
				}
			}
		}
	}

	/**
	 * 获取对应配置文件中的所有 key = value 值对，Properties形式
	 * */
	public static Properties getProperties(String configFile) {
		InputStream in = null;
		try {
			String fileName = null;
			if (!configFile.startsWith("/")) {
//				fileName = LianaStandard.getRootPath() + "WEB-INF/" + configFile;
			} else {
//				fileName = LianaStandard.getRootPath() + "WEB-INF" + configFile;
			}

			in = new BufferedInputStream(new FileInputStream(fileName));
	        Properties prop = new Properties();
	        prop.load(in);
			return prop;

		} catch (FileNotFoundException fnfe) {
//			Trace.logWarning( Trace.COMPONENT_CORE, "资源文件[" + configFile + "]不存在", fnfe );
			return null;
		} catch (IOException ioe) {
//			Trace.logWarning( Trace.COMPONENT_CORE, "资源文件[" + configFile + "]读取出错", ioe );
			return null;
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
				}
			}
		}
	}
	
}
