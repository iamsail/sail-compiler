#include <vector>
#include <iostream>
#include <vector>
using namespace std;

string inputChar;       //字母表,每个元素是输入符号
int status[20];         //状态集合
vector<int> startStatus;//开始状态集合(初态)
int endStatus[10];      //终止状态集合
vector<char> NFA[40][3];        //对每条边的描述,对应5元组的f
//char NFA[40][3];        //对每条边的描述,对应5元组的f
bool flag=false;        // NFA 是否具有【一颗赛罗-转移】

int startStatusClosure[20][20]; // 记录初态的【一颗赛罗-闭包】

//TODO:
//1.在将NFA转换为DFA时,需要分是否具有【一颗赛罗-转移】两个大方向进行讨论


void input(){
    cout<<"请输入 输入符号"<<endl;
    cin>>inputChar;

    cout<<"请输入 初态"<<endl;
    for(int i=0;;i++)
    {   int tem;
        cin >> tem;
        startStatus.push_back(tem);
        if(getchar()=='\n') //遇回车结束
            break;
    }

    cout<<"请输入各条边,依次输入 状态  输入符号(* 表示 空符号[一颗赛罗])  状态,以 \ 结束  "<<endl;
    for(int i=0;;i++)
    {
        cin>>NFA[i][0]>>NFA[i][1]>>NFA[i][2];
        if(NFA[i][1] == '*'){
            flag=true;
        }
        if(getchar() == '\\' )
            break;
    }
}

void output(){

}

//求出初态的闭包
void startClosure(vector<int> startStatus){
    //对每个初态求出(一颗赛罗)闭包
    for(int i = 0; i < startStatus.size();i++){
        startStatus[i]
        for(int j = 0;j < )
    }
}


//NFA识别符号串
bool recognizeSymbolString(){

}

int main(){
    input();
    if(flag){   // NFA 具有  一颗赛罗-转移
        startClosure(startStatus); // 求出初态的闭包
    }else{      // NFA 不具有  一颗赛罗-转移

    }
    return 0;
}





