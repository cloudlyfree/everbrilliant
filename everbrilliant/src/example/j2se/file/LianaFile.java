package example.j2se.file;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.LinkedList;
import java.util.List;

/**
 * 文件操作方法封装类
 * 
 */
public class LianaFile {
	/**
	 * 换行符
	 */
	public static String LINE_SEPARATOR = System.getProperties().getProperty( "line.separator" );
	/**
	 * 目录分隔符
	 */
	public static String DIR_SEPARATOR = "/";

	/**
	 * 禁止生成实例
	 */
	private LianaFile() {
		// 禁止生成实例
	}

	/**
	 * 读入指定的文件到字符串中
	 * 
	 * @param filePathName
	 *            文件路径名
	 * @return 文件内容
	 * @throws IOException
	 *             文件读取失败
	 */
	public static String readTextFileToString( String filePathName ) throws IOException
	{
		String strTemp;
		StringBuffer result = new StringBuffer();
		BufferedReader freader = null;
		try
		{
			freader = new BufferedReader( new FileReader( filePathName ) );
			while ( (strTemp = freader.readLine()) != null )
			{
				result.append( strTemp );
				result.append( LINE_SEPARATOR );
			}
		}
		finally
		{
			if ( freader != null )
			{
				freader.close();
			}
		}
		if ( result.length() > 2 )
		{
			return result.substring( 0, result.length() - LINE_SEPARATOR.length() );
		}
		else
		{
			return result.toString();
		}
	}

	/**
	 * 读入指定的文件到字符串中
	 * 
	 * @param filePathName
	 *            文件路径名
	 * @param encoding
	 *            文件编码
	 * @return 文件内容
	 * @throws IOException
	 */
	public static String readTextFileToString( String filePathName, String encoding ) throws IOException
	{
		String strTemp;
		StringBuffer result = new StringBuffer();
		BufferedReader freader = null;
		try
		{
			freader = new BufferedReader( new InputStreamReader( new FileInputStream( filePathName ), encoding ) );
			while ( (strTemp = freader.readLine()) != null )
			{
				result.append( strTemp );
				result.append( LINE_SEPARATOR );
			}
		}
		finally
		{
			if ( freader != null )
			{
				freader.close();
			}
		}
		if ( result.length() > 0 )
		{
			// 去除最后一个换行符
			return result.substring( 0, result.length() - LINE_SEPARATOR.length() );
		}
		else
		{
			return result.toString();
		}
	}

	/**
	 * 将字符串写入到指定的文件中
	 * 
	 * @param filePathName
	 *            文件路径名
	 * @param fileContent
	 *            文件内容
	 * @param encoding
	 *            文件编码
	 * @param append
	 *            true:追加到文件尾部;false:覆盖文件
	 * @throws IOException
	 *             文件写入失败
	 */
	public static void writeStringToFile( String filePathName, String fileContent, String encoding, boolean append )
			throws IOException
	{
		BufferedWriter fileWriter = null;
		try
		{
			fileWriter = new BufferedWriter( new OutputStreamWriter(
					new FileOutputStream( filePathName, append ),
					encoding ) );
			fileWriter.write( fileContent );
		}
		finally
		{
			if ( fileWriter != null )
			{
				fileWriter.close();
			}
		}
	}

	/**
	 * 在指定位置建立多级目录结构
	 * 
	 * @param rootPath
	 * @param filePathName
	 * @throws TranFailException
	 */
	public static void makeMultiDirectory( String path )
	{
		// 检查根目录是否存在
		if ( !(new File( path ).isDirectory()) )
		{
			// 依次建立各级目录
			String[] dirStrArray = path.split( DIR_SEPARATOR );
			StringBuffer dirStr = new StringBuffer( dirStrArray[0] );
			for ( int i = 0; i < dirStrArray.length - 1; i++ )
			{
				dirStr.append( DIR_SEPARATOR );
				dirStr.append( dirStrArray[i + 1] );
				dirStr.append( DIR_SEPARATOR );
				if ( !(new File( dirStr.toString() ).isDirectory()) )
				{
					new File( dirStr.toString() ).mkdirs();
				}
			}
		}
	}

	/**
	 * 读入一文件夹下所有文件名
	 * 
	 * @param folder
	 *            文件夹绝对路径
	 * @return 存储文件名的Vector
	 * @throws IOException
	 */
	public static List<String> readFiles( String folder ) throws IOException
	{
		List<String> result = new LinkedList<String>();
		File dir = new File( folder );
		File[] fileList = dir.listFiles();
		for ( int i = 0; i < fileList.length; i++ )
		{
			if ( fileList[i].isDirectory() )
			{
				List<String> subDir = readFiles( fileList[i].getPath() );
				int size = subDir.size();
				for ( int j = 0; j < size; j++ )
				{
					String filename = subDir.get( j );
					result.add( filename );
				}
			}
			result.add( fileList[i].getAbsolutePath() );
		}
		return result;
	}

	/**
	 * 获取文件扩展名，如果没有扩展名返回空串。<br>
	 * 例如:abc.txt文件类型为"txt"，abc.123.exe文件类型为"exe"，myfile文件类型为""
	 * 
	 * @param fileName
	 * @return String
	 */
	public static String getFileType( String fileName )
	{
		int dotPos = fileName.lastIndexOf( '.' );
		if ( dotPos > 0 )
		{
			return fileName.substring( dotPos + 1 );
		}
		else
		{
			return "";
		}
	}
}
