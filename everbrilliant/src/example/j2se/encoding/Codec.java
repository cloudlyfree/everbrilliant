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
// $Log: Codec.java,v $
// Revision 1.2  2010/01/27 05:56:55  liangqiang
// init version
//
// 

package com.everbrilliant.j2se.encoding;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.util.Hashtable;
import java.util.Map;

/**
 * 转码器<br>
 * 使用示例： <br>
 * Codec test = new Codec( "c:/hcutf8.txt" ); <br>
 * StringBuffer result = new StringBuffer( big5String );<br>
 * test.convertStringBuffer( result, CodecConstants.UTF8, CodecConstants.GB2312 );<br>
 * System.out.println( result );
 * 
 * @version 1.0 2008-09-01
 * @author erik@mandarintools.com
 * @author rewrite by zhanghao@yuchengtech.com
 */
public class Codec {
	// Simplfied/Traditional character equivalence hashes
	private Map s2thash, t2shash;
	private int unsupportedStrategy = UNIESC;
	private final static int DELETE = 0;
	private final static int HTMLESC = 1;
	private final static int UNIESC = 2;
	private final static int QUESTIONMARK = 3;

	/**
	 * Constructor
	 * 
	 * @param tableFilePathName
	 *            转码文件位置
	 * @throws IOException
	 */
	public Codec(String tableFilePathName) throws IOException {
		String dataline;
		// Initialize and load in the simplified/traditional character hashses
		s2thash = new Hashtable();
		t2shash = new Hashtable();
		BufferedReader reader = null;
		try
		{
			reader = new BufferedReader( new InputStreamReader( new FileInputStream( tableFilePathName ), "UTF8" ) );
			while ( (dataline = reader.readLine()) != null )
			{
				// Skip empty and commented lines
				if ( dataline.length() == 0 || dataline.charAt( 0 ) == '#' )
				{
					continue;
				}
				// Simplified to Traditional, (one to many, but pick only one)
				s2thash.put( dataline.substring( 0, 1 ), dataline.substring( 1, 2 ) );
				// Traditional to Simplified, (many to one)
				for ( int i = 1; i < dataline.length(); i++ )
				{
					t2shash.put( dataline.substring( i, i + 1 ), dataline.substring( 0, 1 ) );
				}
			}
		}
		finally
		{
			if ( reader != null )
				reader.close();
		}
	}

	public String convertString( String inline, int source_encoding, int target_encoding )
	{
		StringBuffer outline = new StringBuffer( inline );
		convertStringBuffer( outline, source_encoding, target_encoding );
		return outline.toString();
	}

	public void convertStringBuffer( StringBuffer dataline, int source_encoding, int target_encoding )
	{
		int lineindex;
		String currchar;
		char charvalue;
		if ( source_encoding == CodecConstants.HZ )
		{
			hz2gbStringBuffer( dataline );
		}
		for ( lineindex = 0; lineindex < dataline.length(); lineindex++ )
		{
			charvalue = dataline.charAt( lineindex );
			currchar = "" + charvalue;
			if ( (charvalue == 0xfeff || charvalue == 0xfffe)
					&& (target_encoding != CodecConstants.UNICODE && target_encoding != CodecConstants.UNICODES
							&& target_encoding != CodecConstants.UNICODET && target_encoding != CodecConstants.UTF8
							&& target_encoding != CodecConstants.UTF8S && target_encoding != CodecConstants.UTF8T) )
			{
				dataline.deleteCharAt( lineindex );
				continue;
			}
			if ( (source_encoding == CodecConstants.GB2312 || source_encoding == CodecConstants.GBK || source_encoding == CodecConstants.ISO2022CN_GB
					|| source_encoding == CodecConstants.HZ || source_encoding == CodecConstants.GB18030 || source_encoding == CodecConstants.UNICODE
					|| source_encoding == CodecConstants.UNICODES || source_encoding == CodecConstants.UTF8 || source_encoding == CodecConstants.UTF8S)
					&& (target_encoding == CodecConstants.BIG5 || target_encoding == CodecConstants.CNS11643
							|| target_encoding == CodecConstants.UNICODET || target_encoding == CodecConstants.UTF8T || target_encoding == CodecConstants.ISO2022CN_CNS) )
			{
				if ( s2thash.containsKey( currchar ) == true )
				{
					dataline.replace( lineindex, lineindex + 1, (String) s2thash.get( currchar ) );
				}
			}
			else if ( (source_encoding == CodecConstants.BIG5 || source_encoding == CodecConstants.CNS11643
					|| source_encoding == CodecConstants.UNICODET || source_encoding == CodecConstants.UTF8
					|| source_encoding == CodecConstants.UTF8T || source_encoding == CodecConstants.ISO2022CN_CNS
					|| source_encoding == CodecConstants.GBK || source_encoding == CodecConstants.GB18030 || source_encoding == CodecConstants.UNICODE)
					&& (target_encoding == CodecConstants.GB2312 || target_encoding == CodecConstants.UNICODES
							|| target_encoding == CodecConstants.ISO2022CN_GB || target_encoding == CodecConstants.UTF8S || target_encoding == CodecConstants.HZ) )
			{
				if ( t2shash.containsKey( currchar ) == true )
				{
					dataline.replace( lineindex, lineindex + 1, (String) t2shash.get( currchar ) );
				}
			}
		}
		if ( target_encoding == CodecConstants.HZ )
		{
			// Convert to look like HZ
			gb2hzStringBuffer( dataline );
		}
		Charset charset = Charset.forName( CodecConstants.JAVA_CHARSET_NAME[target_encoding] );
		CharsetEncoder encoder = charset.newEncoder();
		for ( int i = 0; i < dataline.length(); i++ )
		{
			if ( encoder.canEncode( dataline.subSequence( i, i + 1 ) ) == false )
			{
				// Replace or delete
				// Delete
				if ( unsupportedStrategy == DELETE )
				{
					dataline.deleteCharAt( i );
					i--;
				}
				else if ( unsupportedStrategy == HTMLESC )
				{
					// HTML Escape &#xNNNN;
					dataline.replace( i, i + 1, "&#x" + Integer.toHexString( dataline.charAt( i ) ) + ";" );
				}
				else if ( unsupportedStrategy == UNIESC )
				{
					// Unicode Escape \\uNNNN
					dataline.replace( i, i + 1, "\\u" + Integer.toHexString( dataline.charAt( i ) ) );
				}
				else if ( unsupportedStrategy == QUESTIONMARK )
				{
					// Unicode Escape \\uNNNN
					dataline.replace( i, i + 1, "?" );
				}
			}
		}
	}

	public String hz2gb( String hzstring )
	{
		StringBuffer gbstring = new StringBuffer( hzstring );
		hz2gbStringBuffer( gbstring );
		return gbstring.toString();
	}

	public void hz2gbStringBuffer( StringBuffer hzstring )
	{
		byte[] gbchar = new byte[2];
		int i = 0;
		// Convert to look like equivalent Unicode of GB
		for ( i = 0; i < hzstring.length(); i++ )
		{
			if ( hzstring.charAt( i ) == '~' )
			{
				if ( hzstring.charAt( i + 1 ) == '{' )
				{
					hzstring.delete( i, i + 2 );
					while ( i < hzstring.length() )
					{
						if ( hzstring.charAt( i ) == '~' && hzstring.charAt( i + 1 ) == '}' )
						{
							hzstring.delete( i, i + 2 );
							i--;
							break;
						}
						else if ( hzstring.charAt( i ) == '\r' || hzstring.charAt( i ) == '\n' )
						{
							break;
						}
						gbchar[0] = (byte) (hzstring.charAt( i ) + 0x80);
						gbchar[1] = (byte) (hzstring.charAt( i + 1 ) + 0x80);
						try
						{
							hzstring.replace( i, i + 2, new String( gbchar, "GB2312" ) );
						}
						catch ( Exception usee )
						{
							System.err.println( usee.toString() );
						}
						i++;
					}
				}
				else if ( hzstring.charAt( i + 1 ) == '~' )
				{ // ~~ becomes ~
					hzstring.replace( i, i + 2, "~" );
				}
			}
		}
	}

	public String gb2hz( String gbstring )
	{
		StringBuffer hzbuffer = new StringBuffer( gbstring );
		gb2hzStringBuffer( hzbuffer );
		return hzbuffer.toString();
	}

	public void gb2hzStringBuffer( StringBuffer gbstring )
	{
		byte[] gbbytes = new byte[2];
		int i;
		boolean terminated = false;
		for ( i = 0; i < gbstring.length(); i++ )
		{
			if ( gbstring.charAt( i ) > 0x7f )
			{
				gbstring.insert( i, "~{" );
				terminated = false;
				while ( i < gbstring.length() )
				{
					if ( gbstring.charAt( i ) == '\r' || gbstring.charAt( i ) == '\n' )
					{
						gbstring.insert( i, "~}" );
						i += 2;
						terminated = true;
						break;
					}
					else if ( gbstring.charAt( i ) <= 0x7f )
					{
						gbstring.insert( i, "~}" );
						i += 2;
						terminated = true;
						break;
					}
					try
					{
						gbbytes = gbstring.substring( i, i + 1 ).getBytes( "GB2312" );
					}
					catch ( UnsupportedEncodingException uee )
					{
						System.err.println( uee.toString() );
					}
					gbstring.delete( i, i + 1 );
					gbstring.insert( i, (char) (gbbytes[0] + 256 - 0x80) );
					gbstring.insert( i + 1, (char) (gbbytes[1] + 256 - 0x80) );
					i += 2;
				}
				if ( terminated == false )
				{
					gbstring.insert( i, "~}" );
					i += 2;
				}
			}
			else
			{
				if ( gbstring.charAt( i ) == '~' )
				{
					gbstring.replace( i, i + 1, "~~" );
					i++;
				}
			}
		}
	}
}
