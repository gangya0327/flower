package HelloJava;

public class Person {
    /**
     * 状态：成员变量
     * 姓名
     * 年龄
     * 身高
     */
    String name;
    int age;
    int height;

    /**
     * 行为：方法
     * 跳舞
     * 唱歌
     */
    void dance(String danceName) {
        System.out.println("跳 " + danceName);
    }

    void sing(String singName) {
        System.out.println("唱 " + singName);
    }

    public static void main(String[] args) {
        Person yml = new Person();
        yml.name = "raven";
        yml.age = 28;
        yml.height = 172;

        System.out.println(yml.name);
        yml.sing("讲真的");
    }

    /**
     * JVM内存分配
     * 1. 方法区：静态区，存放class，static变量
     * 2. 栈：每调用一个函数，就生成一个栈帧并加入虚拟机。一个函数的执行到结束，对应一个栈帧的入栈和出栈
     * 3. 本地方法区：与栈类似，栈为java方法服务，而本地方法区为Native方法服务
     * 4. 堆：所有线程共享， 虚拟机创建时启动，所有对象实例和数组都在对象上分配
     * 5. 程序计数器：当前线程所执行的字节码的行号指示器
     */

    /**
     * 构造器特点
     * 1. 名称与当前类名相同
     * 2. 禁止定义返回类型，不能使用void作为返回类型
     * 3. 不需要使用return语句，会返回当前创建对象的引用
     *
     * 默认构造器特点
     * 1. 符合构造器特点
     * 2. 无参数
     * 3. 根据当前类有无public修饰决定构造器有无public修饰
     */
}
