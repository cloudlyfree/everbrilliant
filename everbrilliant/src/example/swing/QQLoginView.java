package example.swing;

import java.awt.BorderLayout;
import java.net.URL;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
/**
 * 仿QQ登录界面，仅供学习参考，涉及到的有窗口居中、JPanel、LayoutManager的使用
 * @author hhzxj2008
 * */
public class QQLoginView extends JFrame {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5665975170821790753L;

	public QQLoginView() {
		initComponent();
	}
	
	private void initComponent() {
		setTitle("用户登录");
		//设置LOGO
		URL image = QQLoginView.class.getClassLoader().getResource("com/everbrilliant/swing/year.jpg");//图片的位置
		JLabel imageLogo = new JLabel(new ImageIcon(image));
		add(imageLogo,BorderLayout.NORTH);
		
		//QQ号和密码
		JPanel jp = new JPanel();
		JPanel jpAccount = new JPanel();
		jpAccount.add(new JLabel("帐号"));
		JTextField userTextField = new JTextField(15);
		jpAccount.add(userTextField);
		jpAccount.add(new JLabel("用户注册"));
		jp.add(jpAccount);
		
		JPanel jpPass = new JPanel();
		jpPass.add(new JLabel("密码"));
		JPasswordField passTextField = new JPasswordField(15);
		jpPass.add(passTextField);
		jpPass.add(new JLabel("找回密码"));
		jp.add(jpPass);
		
		//登录设置
		JPanel jpstatus = new JPanel();
		jpstatus.add(new JLabel("状态"));
		JComboBox statusComboBox = new JComboBox();
		statusComboBox.addItem("Q我");
		statusComboBox.addItem("在线");
		statusComboBox.addItem("隐身");
		statusComboBox.addItem("离线");
		jpstatus.add(statusComboBox);
		jpstatus.add(new JCheckBox("记住密码"));
		jpstatus.add(new JCheckBox("自动登录"));
		jp.add(jpstatus);
		add(jp);
		
		//底部登录按钮
		JPanel bottomPanel = new JPanel();
		bottomPanel.setLayout(new BorderLayout());
		bottomPanel.add(new JButton("设置"),BorderLayout.WEST);
		bottomPanel.add(new JButton("登录"),BorderLayout.EAST);
		add(bottomPanel,BorderLayout.SOUTH);
		setSize(324,230);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setLocationRelativeTo(null);
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		java.awt.EventQueue.invokeLater(new Runnable(){

			@Override
			public void run() {
				new QQLoginView().setVisible(true);
				
			}
			
		});
		
	}
}