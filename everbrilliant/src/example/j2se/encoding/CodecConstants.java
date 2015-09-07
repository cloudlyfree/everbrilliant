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
// $Log: CodecConstants.java,v $
// Revision 1.2  2010/01/27 05:56:55  liangqiang
// init version
//
// 

package example.j2se.encoding;

/**
 * 转码器常量
 * 
 * @version 1.0 2008-09-01
 * @author erik@mandarintools.com
 * @author rewrite by zhanghao@yuchengtech.com
 */
public class CodecConstants {
	// Supported Encoding Types
	public static int GB2312 = 0;
	public static int GBK = 1;
	public static int GB18030 = 2;
	public static int HZ = 3;
	public static int BIG5 = 4;
	public static int CNS11643 = 5;
	public static int UTF8 = 6;
	public static int UTF8T = 7;
	public static int UTF8S = 8;
	public static int UNICODE = 9;
	public static int UNICODET = 10;
	public static int UNICODES = 11;
	public static int ISO2022CN = 12;
	public static int ISO2022CN_CNS = 13;
	public static int ISO2022CN_GB = 14;
	public static int EUC_KR = 15;
	public static int CP949 = 16;
	public static int ISO2022KR = 17;
	public static int JOHAB = 18;
	public static int SJIS = 19;
	public static int EUC_JP = 20;
	public static int ISO2022JP = 21;
	public static int ASCII = 22;
	public static int OTHER = 23;
	public static int TOTALTYPES = 24;
	// Names of the encodings as understood by Java
	public static String[] JAVA_CHARSET_NAME;
	static
	{
		JAVA_CHARSET_NAME = new String[TOTALTYPES];
		// Assign encoding names
		JAVA_CHARSET_NAME[GB2312] = "GB2312";
		JAVA_CHARSET_NAME[GBK] = "GBK";
		JAVA_CHARSET_NAME[GB18030] = "GB18030";
		JAVA_CHARSET_NAME[HZ] = "ASCII"; // What to put here? Sun doesn't support HZ
		JAVA_CHARSET_NAME[ISO2022CN_GB] = "ISO2022CN_GB";
		JAVA_CHARSET_NAME[BIG5] = "BIG5";
		JAVA_CHARSET_NAME[CNS11643] = "EUC-TW";
		JAVA_CHARSET_NAME[ISO2022CN_CNS] = "ISO2022CN_CNS";
		JAVA_CHARSET_NAME[ISO2022CN] = "ISO2022CN";
		JAVA_CHARSET_NAME[UTF8] = "UTF8";
		JAVA_CHARSET_NAME[UTF8T] = "UTF8";
		JAVA_CHARSET_NAME[UTF8S] = "UTF8";
		JAVA_CHARSET_NAME[UNICODE] = "Unicode";
		JAVA_CHARSET_NAME[UNICODET] = "Unicode";
		JAVA_CHARSET_NAME[UNICODES] = "Unicode";
		JAVA_CHARSET_NAME[EUC_KR] = "EUC_KR";
		JAVA_CHARSET_NAME[CP949] = "MS949";
		JAVA_CHARSET_NAME[ISO2022KR] = "ISO2022KR";
		JAVA_CHARSET_NAME[JOHAB] = "Johab";
		JAVA_CHARSET_NAME[SJIS] = "SJIS";
		JAVA_CHARSET_NAME[EUC_JP] = "EUC_JP";
		JAVA_CHARSET_NAME[ISO2022JP] = "ISO2022JP";
		JAVA_CHARSET_NAME[ASCII] = "ASCII";
		JAVA_CHARSET_NAME[OTHER] = "ISO8859_1";
	}
}
