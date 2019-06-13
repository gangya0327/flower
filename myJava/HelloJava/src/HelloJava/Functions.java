package HelloJava;

public class Functions {
    public static void main(String[] args) {
        printWord();
        System.out.println(sum(4, 5));

        login("admin", "123456");
    }

    static void printWord() {
        System.out.println("hello world");
    }

    /**
     * 方法注意事项：
     * 1. 写在声明类class中
     * 2. 写在其他方法之外
     * 3. 定义方法不分先后
     * 4. 如果一个方法前有static，在该方法当中调用其他方法前面也要有static
     * 5. 一个类中可以写多个方法
     *
     * 方法结构：
     * [修饰符] 返回值类型 方法名([形参...]){
     * 方法体
     * [return 值]
     * }
     *
     * void 返回值为空
     * 如果有返回值，内部必须有return
     *
     * 驼峰命名法：第一个字母小写，后面每一个单词首字母大写
     */

    /**
     * 求和
     *
     * @param a 一个参数
     * @param b
     * @return
     */
    static int sum(int a, int b) {
        int sum = a + b;
        return sum;
    }

    /**
     * 登录功能
     * @param userName 用户名
     * @param passWord 密码
     * @return         返回1/0
     */
    static int login(String userName, String passWord) {
        //判断用户名密码是否正确，正确提示登录成功，否则提示登录失败
        if (userName == "admin" && passWord == "123456") {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * 方法的重载：在同一个类中，允许方法名相同，参数不同
     */
}
