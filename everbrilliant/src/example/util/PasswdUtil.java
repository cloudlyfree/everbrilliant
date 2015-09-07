package example.util;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

/**
 * @author qiuxuequan
 */
public class PasswdUtil {

	public static void main(String[] args) {
		
		String cardNo = "44011119840101271";

		String encCardNo = encrypt(cardNo);//加密
		
		System.err.println("密文：" + encCardNo);
 
		String decCardNo = decrypt(encCardNo);//解密
		System.err.println("明文：" + decCardNo);
	}

	/**
	 * 加密
	 * 
	 * @param src
	 *            明文
	 * @return 密文，长度：明文长度*2 + 5
	 */
	public static String encrypt(String src) {
		if (isBlank(src))
			throw new RuntimeException("明文不能为空");
		int len = src.getBytes().length;
		int destLen = 2 * len + 5;
		return encrypt(src, destLen);
	}

	/**
	 * 加密
	 * 
	 * @param src
	 *            源字符串
	 * @param destLen
	 *            加密后字符串默认长度
	 * @return 加密字符串
	 */
	private static String encrypt(String src, int destLen) {
		int listLen = chars.size();
		if (isBlank(src) || src.length() > listLen)
			throw new RuntimeException("明文为空或长度超过" + listLen + "位字符");
		int len = src.length();

		// 随机数位数 随机数,1-2位 密文/原文长度 位置值 [随机数] 密文顺序 密文加密值 [随机数]
		// 随机数位数
		int ranBit = random.nextInt(listLen);
		String ranBitStr = (String) chars.get(ranBit);
		ranBit = ranBit % 2 == 0 ? 0 : 1;
		// 随机数
		String ran = (String) chars.get(random.nextInt(listLen));
		while (--ranBit >= 0) {
			ran += (String) chars.get(random.nextInt(listLen));
		}

		// 密文/原文长度
		String lenStr = (String) chars.get(len);

		// 1：随机数位数，ran.length():随机数，1：密文/原文长度,1:位置值
		int bLen = 1 + ran.length() + 1 + 1;

		// 位置值
		int bitVal = random.nextInt(listLen);

		if (2 * len > destLen - bLen) {
			bitVal = bLen;
		} else {
			while (destLen - bitVal < 2 * len || bitVal < bLen) {
				bitVal = random.nextInt(listLen);
			}
		}

		String bitStr = (String) chars.get(bitVal);

		// 位置值后，加密串前的长度差
		int bBetween = bitVal - bLen;

		// 位置值后，加密串前的随机数
		StringBuffer bRan = new StringBuffer(bBetween);
		while (bBetween-- > 0) {
			bRan.append(chars.get(random.nextInt(listLen)));
		}

		// 加密串后的剩余长度
		int aBetween = destLen - (bLen + bRan.length() + 2 * len);
		if (aBetween < 0)
			aBetween = 0;
		// 加密串后的随机数
		StringBuffer aRan = new StringBuffer(aBetween);
		while (aBetween-- > 0) {
			aRan.append(chars.get(random.nextInt(listLen)));
		}

		Set set = new LinkedHashSet();
		while (set.size() < len) {
			set.add(random.nextInt(len) + "");
		}
		String[] destAS = set.toString().replaceAll("[\\[\\]\\s]", "").split(
				",");
		StringBuffer destA = new StringBuffer(len);// 密文顺序
		StringBuffer destB = new StringBuffer(src);// 密文加密值
		for (int i = 0; i < len; i++) {
			int idx = Integer.parseInt(destAS[i]);
			destA.append(chars.get(idx));

			String s = src.substring(i, i + 1);
			int ii = chars.indexOf(s);
			if (ii < 0)// 源字符不在预定义字符列表内
				destB.replace(idx, idx + 1, s);
			else {
				destB.replace(idx, idx + 1, (String) chars
						.get(listLen - ii - 1));
			}
		}

		// 随机数位数 随机数,1-2位 密文/原文长度 位置值 [随机数] 密文顺序 密文加密值 [随机数]
		StringBuffer dest = new StringBuffer(destLen);
		dest.append(ranBitStr);// 随机数位数
		dest.append(ran);// 随机数,1-2位
		dest.append(lenStr);// 密文/原文长度
		dest.append(bitStr);// 位置值
		dest.append(bRan.toString());// 位置值后随机数
		dest.append(destA.toString());// 密文顺序
		dest.append(destB.toString());// 密文加密值
		dest.append(aRan.toString());// 密文后随机数

		return dest.toString();
	}

	/**
	 * 解密
	 * 
	 * @param dest
	 *            加密字符串
	 * @return 源字符串
	 */
	public static String decrypt(String dest) {
		int listLen = chars.size();
		if (isBlank(dest))
			throw new RuntimeException("密文不能为空");

		// 随机数位数 随机数,1-2位 密文/原文长度 位置值 [随机数] 密文顺序 密文加密值 [随机数]

		// 随机数
		String ranBitStr = dest.substring(0, 1);
		// 随机数位数
		int ranBit = chars.indexOf(ranBitStr) % 2 == 0 ? 0 : 1;

		// 密文/原文长度
		int srcLen = chars.indexOf(dest.substring(ranBit + 2, ranBit + 2 + 1));

		if (srcLen > listLen) {
			throw new RuntimeException("密文长度超过" + listLen + "位字符");
		}

		// 位置值
		int posi = chars.indexOf(dest.substring(ranBit + 3, ranBit + 3 + 1));

		// 密文顺序 密文加密值
		dest = dest.substring(posi, posi + 2 * srcLen);

		// 密文顺序
		String destAS = dest.substring(0, srcLen);

		// 密文加密值
		String destBS = dest.substring(srcLen);

		// 明文
		StringBuffer src = new StringBuffer(srcLen);
		for (int i = 0; i < srcLen; i++) {
			int idx = chars.indexOf(destAS.substring(i, i + 1));

			String s = destBS.substring(idx, idx + 1);
			int ii = chars.indexOf(s);
			if (ii < 0) {
				src.append(s);
			} else {
				src.append(chars.get(listLen - ii - 1));
			}
		}

		return src.toString();
	}

	private static boolean isBlank(String str) {
		return str == null || "".equals(str.trim());
	}

	private static Random random = new Random();

	private static List chars = Arrays.asList(new String[] { "c", "y", "p",
			"d", "R", "f", "s", "P", "e", "Q", "S", "-", "T", "U", "t", "u",
			"v", "w", "x", "7", "z", "0", "1", "a", "m", "b", "3", "4", "g",
			"h", "i", "j", "k", "o", "W", "q", "r", "5", "_", "2", "6", "8",
			"9", "B", "C", "D", "E", "H", "I", "J", "K", "V", "A", "L", "M",
			"N", ".", "O", "X", "l", "n", "Y", "Z", "F", "G" });
}
