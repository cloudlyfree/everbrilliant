/**
 *  Establish date May 7, 2009 11:36:42 PM.
 *  package enterprise.celerity.framework.util.
 */
package com.everbrilliant.j2se.file;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
public class ConfigUtil {
	
    private static Map constantsMap = new HashMap();
  //  private static String constantsFileName1 = "Constants.properties";
    private static ConfigUtil configServiceInstance = new ConfigUtil();
    
	private ConfigUtil() {
	}

/*	public static void initMessages(List pMessageResourcesList) {
		messageResourcesList = pMessageResourcesList;
	}*/

	public static void initConstants(String constantsFileName)
			throws Exception {
		getInstance().loadProperties(constantsFileName, constantsMap);
	}

	public static String getConstant(String constantsFileName,String key) {
		if (constantsMap.get(constantsFileName)==null){
			try {
				initConstants(constantsFileName);
			} catch (Exception e) {
			}
		}
		
		Object value = null;
		if(constantsMap.get(constantsFileName)!=null){
			value = ((Map)constantsMap.get(constantsFileName)).get(key);
		}
		
		if (value != null)
			return ((String) value).trim();
		else
			return null;
	}
	
/*	public static void setConstant(String key,String value){
		
		if (!initFlag){
			try {
				initConstants();
			} catch (Exception e) {
				log.error("��ʼ�������ļ�����:",e);
			}
		}
		if(key!=null){
			constantsMap.put(key, value);
		}
		
	}*/

	/*public List getConstants(String prefix) {
		if (!initFlag){
			try {
				initConstants();
			} catch (Exception e) {
				log.error("��ʼ�������ļ�����:",e);
			}
		}
		List results = new ArrayList();
		int i = 1;
		do {
			String key = prefix + "." + i;
			String value = getConstant(key);
			if (value != null) {
				results.add(value);
				i++;
			} else {
				return results;
			}
		} while (true);
	}*/

	

	private void loadProperties(String constantsFileName, Map constantsMap) throws Exception {
		Properties props = new Properties();
		Map resultMap = new HashMap();
		InputStream propertiesInputStream = null;
		try {
			propertiesInputStream = getClass().getClassLoader().getResourceAsStream(constantsFileName);
			props.load(propertiesInputStream);
			for (Iterator iter = props.keySet().iterator(); iter != null
					&& iter.hasNext();) {
				String key = (String) iter.next();
				String value = props.getProperty(key);
				synchronized (resultMap) {
					resultMap.put(key, value);
				}
			}
			constantsMap.put(constantsFileName, resultMap);
			
		} catch (FileNotFoundException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		}finally{
			try{
				propertiesInputStream.close();
			}catch(Exception e){}
		}
	}

/*	public static boolean getInitFlag() {
		return initFlag;
	}*/

	public static ConfigUtil getInstance() {
		return configServiceInstance;
	}
}
