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
// $Log: RandomGUID.java,v $
// Revision 1.1  2010/01/27 05:56:55  liangqiang
// init version
//
// 

package com.everbrilliant.util;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;


/**
 * GUID(32位)生成器
 * 	 主要用于电子回单验证码
 */
public class RandomGUID {

	public String valueBeforeMD5 = "";
	public String valueAfterMD5 = "";
	private static Random myRand;
	private static SecureRandom mySecureRand;
	private static String s_id;

	static {
		mySecureRand = new SecureRandom();
		long secureInitializer = mySecureRand.nextLong();
		myRand = new Random(secureInitializer);
		try {
			s_id = InetAddress.getLocalHost().toString();
		} catch (UnknownHostException e) {
//			Trace.logError( Trace.COMPONENT_CORE, e.getMessage(), e );
		}

	}

	/*
	 * Default constructor. With no specification of security option, this
	 * constructor defaults to lower security, high performance.
	 */
	public RandomGUID() {
		getRandomGUID(false);
	}

	/*
	 * Constructor with security option. Setting secure true enables each random
	 * number generated to be cryptographically strong. Secure false defaults to
	 * the standard Random function seeded with a single cryptographically
	 * strong random number.
	 */
	public RandomGUID(boolean secure) {
		getRandomGUID(secure);
	}

	/*
	 * Method to generate the random GUID
	 */
	private void getRandomGUID(boolean secure) {
		MessageDigest md5 = null;
		StringBuffer sbValueBeforeMD5 = new StringBuffer();

		try {
			md5 = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
//			Trace.logError( Trace.COMPONENT_CORE, e.getMessage(), e );
		}

		try {
			long time = System.currentTimeMillis();
			long rand = 0;

			if (secure) {
				rand = mySecureRand.nextLong();
			} else {
				rand = myRand.nextLong();
			}

			// This StringBuffer can be a long as you need; the MD5
			// hash will always return 128 bits. You can change
			// the seed to include anything you want here.
			// You could even stream a file through the MD5 making
			// the odds of guessing it at least as great as that
			// of guessing the contents of the file!
			sbValueBeforeMD5.append(s_id);
			sbValueBeforeMD5.append(":");
			sbValueBeforeMD5.append(Long.toString(time));
			sbValueBeforeMD5.append(":");
			sbValueBeforeMD5.append(Long.toString(rand));

			valueBeforeMD5 = sbValueBeforeMD5.toString();

			/**
			 * 使用指定的字节更新摘要
			 * */
			md5.update(valueBeforeMD5.getBytes());

			byte[] array = md5.digest();

			StringBuffer sb = new StringBuffer();
			for (int j = 0; j < array.length; ++j) {
				int b = array[j] & 0xFF;
				if (b < 0x10)
					sb.append('0');
				sb.append(Integer.toHexString(b));
			}

			valueAfterMD5 = sb.toString();

		} catch (Exception e) {
//			Trace.logError( Trace.COMPONENT_CORE, e.getMessage(), e );
		}
	}

	/**
	 * 对sourceStr字符串生成32位的MD5加密串
	 * */
	public static String generateDigest(String sourceStr) {
		MessageDigest md5 = null;
		try {
			md5 = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
//			Trace.logError( Trace.COMPONENT_CORE, e.getMessage(), e );
		}
		md5.update(sourceStr.getBytes());
		byte[] array = md5.digest();

		StringBuffer sb = new StringBuffer();
		// 取32位
		for (int j = 0; j < array.length; ++j) {
			int b = array[j] & 0xFF;
			if (b < 0x10)
				sb.append('0');
			sb.append(Integer.toHexString(b));
		}
		return sb.toString();
	}

	/**
	 * 生成指定长度的MD5密文
	 * **/
	public static String getRandom(int length) {
		if (length > 32) {
			length = 32;
		}
		RandomGUID myGUID = new RandomGUID();
		String raw = myGUID.valueAfterMD5.toUpperCase();
		return raw.substring(0, length);
	}
	
	/**
	 * 生成6-15位的数字字符串,供加密机加解密使用。同一个userid返回的串是固定的。
	 * 采用java.lang.String hashCode()算法，保证同一个字符串返回的结果相同。
	 * */
	public static final String toFixedIntStr(String str) {
		int h = 0;
		int off = 0;
		if(str==null){
			return "91234";
		}
		char val[] = str.toCharArray();
		int len = val.length;
		for (int i = 0; i < len; i++) {
			h = 31 * h + val[off++];
		}
		return Math.abs(h) + "91234";
	}

	/*
	 * Convert to the standard format for GUID (Useful for SQL Server
	 * UniqueIdentifiers, etc.) Example: C2FEEEAC-CFCD-11D1-8B05-00600806D9B6
	 */
	public String toString() {
		String raw = valueAfterMD5.toUpperCase();
		System.out.println("Raw:" + raw.length());
		StringBuffer sb = new StringBuffer();
		sb.append(raw.substring(0, 12));
		sb.append("-");
		sb.append(raw.substring(8, 12));
		sb.append("-");
		sb.append(raw.substring(12, 16));
		sb.append("-");
		sb.append(raw.substring(16, 20));
		sb.append("-");
		sb.append(raw.substring(20));

		return sb.toString();
	}
	
	public static void main(String[] args){
		String userid="10531112198201011234";
		System.out.println(toFixedIntStr(userid));
	}
}