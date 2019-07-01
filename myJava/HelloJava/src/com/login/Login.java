package com.login;

/**
 * 访问修饰符：规定权限
 * private：私有的，类访问权限，只能在本类中访问
 * protected：子类访问权限，同包中的可以访问，继承可以访问
 * public：全局的，可以公共访问
 * 默认：默认为包访问权限，同个包可以访问，继承不能访问
 *
 */

class User {
    String name;
    private int age;

    void show() {
        System.out.println("我是" + name + " 年龄是" + age);
    }

    void setAge(int a) {
        if (a > 0) {
            age = a;
        } else {
            System.out.println("输入内容不正确");
        }
    }
}

public class Login {
    public static void main(String[] args) {
        User user1 = new User();
        user1.name = "peter";
        user1.setAge(20);
        user1.show();
    }
}
