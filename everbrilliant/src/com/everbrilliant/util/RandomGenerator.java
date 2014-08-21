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
// $Log: RandomGenerator.java,v $
// Revision 1.2  2010/01/27 05:56:55  liangqiang
// init version
//
// 

package com.everbrilliant.util;

import java.util.Random;

/**
 * 随机数生成器
 * 
 * @version 1.0 2009-07-12
 * @author zhanghao@yuchengtech.com
 */
public class RandomGenerator {
	/**
	 * 伪随机数生成器
	 */
	private static Random randomGenerator = new Random();

	/**
	 * 生成随机的旋转角度：顺时针5度到10度之间
	 * 
	 * @return
	 */
	public static double getRandomAngle()
	{
		// 生成18到36间的随机数
		int random = randomGenerator.nextInt( 18 ) + 18;
		double angle = Math.PI / random;
		return angle;
	}

	/**
	 * 生成验证码在图片文字中的位置
	 * 
	 * @param text
	 *            图片中显示的文本
	 * @param codeBeginPosition
	 *            验证码开始位置
	 * @param codeBeginPosition
	 *            验证码总长度
	 * @return 数组，例如{2,5,8}说明验证码在文字中的位置为2,5,8
	 */
	public static Integer[] getCodePositions( String text, int codeBeginPosition, int length )
	{
		int textLength = text.length();
		Integer[] result = new Integer[length];
		// 根据要生产的验证码的位数将文本分为若干个区间
		int lastAreaEndPos = 0;
		int[] areaPos = new int[length + 1];
		areaPos[length] = textLength;
		for ( int i = 0; i < length; i++ )
		{
			areaPos[i] = lastAreaEndPos;
			lastAreaEndPos = (textLength - codeBeginPosition) / length * (i + 1);
		}
		// 在各个区域中生成随机位置
		for ( int i = 0; i < length; i++ )
		{
			result[i] = new Integer( codeBeginPosition + areaPos[i]
					+ randomGenerator.nextInt( areaPos[i + 1] - areaPos[i] ) );
		}
		return result;
	}
}
