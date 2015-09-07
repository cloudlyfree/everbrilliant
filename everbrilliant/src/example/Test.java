package example;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.InvalidAlgorithmParameterException;
import java.security.Provider;
import java.security.SecureRandom;
import java.security.spec.AlgorithmParameterSpec;
import java.text.NumberFormat;
import java.util.Currency;
import java.util.Iterator;
import java.util.Locale;

import javax.crypto.KeyGenerator;
import javax.crypto.KeyGeneratorSpi;
import javax.crypto.SecretKey;

/**
 * 
 * 测试
 * @author Administrator
 *
 */
public class Test {

	public static void main(String[] args) {
		Test t = new Test();
		t.testUtil();
	}	
	
	public void testText(){

	}
	
	public void testUtil(){
		Currency  cur = Currency.getInstance(Locale.CHINA);
		System.out.println(cur.getCurrencyCode()+" "+cur.getSymbol());
		
		
	}
	
	public void testCrypto(){
		KeyGeneratorSpi ks = new KeyGeneratorSpi() {
			
			@Override
			protected void engineInit(int arg0, SecureRandom arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			protected void engineInit(AlgorithmParameterSpec arg0, SecureRandom arg1)
					throws InvalidAlgorithmParameterException {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			protected void engineInit(SecureRandom arg0) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			protected SecretKey engineGenerateKey() {
				// TODO Auto-generated method stub
				return null;
			}
		};
		
		Provider pro = new Provider(null, 0, null) {
		};
		

	}
	
	public void api() throws IOException{
		//
		FileFilter filter = new Myfilter();
		System.out.println(filter.accept(new File("W:/temp/workspace/perbankcc/perbank/JavaSource/com/ecc/liana/cache")));
		
		//
		FilenameFilter filter2 = new Myfilter2();
		System.out.println(filter2.accept(new File("W:/temp/workspace/perbankcc/perbank/JavaSource/com/ecc/liana/cache"), "paomuo"));
		
		//
		InputStream in = this.getClass().getResourceAsStream("aaa.txt");
		
//		InputStreamReader reader = new InputStreamReader(in);
//		BufferedReader bi = new BufferedReader(reader);
//		bi.mark(2);
		
		DataInputStream di = new DataInputStream(in);
		InputStreamReader is = new InputStreamReader(di,"GBK");
		di.mark(5);
		
		StringBuffer sb = new StringBuffer();
		while(in.available()>0){
			if(sb.length()==5){
				di.reset();
			}
			sb.append(is.read());
		}
		
		System.out.println(sb.toString());
		
		//
		
		Runtime.getRuntime().exec("java -version");
		}
	
	public void pt(){
		File f = new File("W:/temp/workspace/perbankcc/perbank/JavaSource/com/ecc/liana/cache");
		File[] fs = f.listFiles();
		for(File file : fs){
			if(file.isDirectory()){
				File[] fd = file.listFiles();
				for(File ff : fd){
					System.out.println(ff.getAbsolutePath());
				}
			}
			System.out.println(file.getAbsolutePath());
		}
	}
}

	class Myfilter implements FileFilter{

		public boolean accept(File pathname) {
			// TODO Auto-generated method stub
			
			if(pathname.getName().contains("cache")){
				
				return true;
			}
			return false;
		}
		
	}
	
	class Myfilter2 implements FilenameFilter{

		public boolean accept(File dir, String name) {
			if(dir.getName().contains(name)){
				
				return true;
			}
			return false;
		}
		
	class Tomcat implements Iterable{

			public Iterator iterator() {
				// TODO Auto-generated method stub
				return null;
			}
			
		}
		
	}
