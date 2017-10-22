#include <iostream>
#include <cstring>

using namespace std;
char prog[1000],ch,token[8];
int p = 0,sym  = 0,n;
char filename[30];
FILE * fpin;
char * keyword[8]= {const_cast<char *>("if"), const_cast<char *>("then"), const_cast<char *>("else"),
                    const_cast<char *>("end"), const_cast<char *>("repeat"), const_cast<char *>("until"), const_cast<char *>("read"),
                    const_cast<char *>("write")};
void GetToken();
int main() {
    p = 0;
    cout<<"请输入源文件名: ";
    for(;;){
        cin >> filename;
        if((fpin = fopen(filename,"r")) != nullptr)
            break;
        else
            cout<<"文件路径出错!请输入源文件名字: ";
    }
    do
    {
        ch = static_cast<char>(fgetc(fpin));
        prog[p++] = ch;
    }while(ch != EOF);

    p = 0;
    do
    {
        GetToken();
        switch (sym){
            case -1:
            case -2:break;
            default:cout<<"("<<sym<<","<<token<<")"<<endl;
                break;
        }
    } while(ch!=EOF);
    return 0;
}
///home/sail/codelife/code/compile/cifafenxi


//TODO:
//1.书上这个示例代码只能 处理8个字符以内的token，否则会报错
//2.读取文件路径应该只能写 绝对路径 ， 我写相对路径时，报错

void GetToken(){
    for(n = 0; n < 8; n++){
        token[n] = '\0';
    }
    n = 0;
    ch = prog[p++];
//    while(ch == ' ' || ch == '\n' || ch == '\t'){ch == prog[p++];}
    while(ch == ' ' || ch == '\n' || ch == '\t'){
        cout<<"执行了  "<<endl;
        ch == prog[p++];
    }
    if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
    {
        sym = 1;
        do
        {
            token[n++] = ch;
            ch = prog[p++];
        }while((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'));
        sym = 2;
        for(n = 0;n < 8;n++){
            if(strcmp(token,keyword[n]) == 0){
                sym = n + 3;
            }
        }
        p--;
    }
    else if (ch == '{')
    {
        do{
            ch = prog[p++];
        }while(ch != '}');
        sym = -1;
        return;
    }
    else if (ch >= '0' && ch <= '9')
    {
        sym = 11;
        do{
            token[n++] = ch;
            ch = prog[p++];
        }while(ch >= '0' && ch <= '9');
        sym = 12;
        p--;
        return;
    }
    else{
        switch(ch){
            case '+':sym = 13;token[0] = ch;break;
            case '-':sym = 14;token[0] = ch;break;
            case '*':sym = 15;token[0] = ch;break;
            case '/':sym = 16;token[0] = ch;break;
            case '=':sym = 17;token[0] = ch;break;
            case '<':sym = 18;token[0] = ch;break;
            case ';':sym = 19;token[0] = ch;break;
            default:sym = -2;cout<<"词法分析器出错,请检查是否输入非法字符!\n";
                break;
        }
    }
}


