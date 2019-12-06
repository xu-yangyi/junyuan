import React from 'react'
import { Collapse } from 'antd';
import { Wrapper,Header } from "../components/pagesStyle/aboutMe-style"

const { Panel } = Collapse;


const AboutMe= ()=>{
    

    return(
        <Wrapper>
            <Header>不同的人，有不同的话</Header>
            <Collapse accordion>
                <Panel id="one"
                       header={<>我只是个路人{<img src="/img/weixiao.png" alt=""/>}</>}
                       showArrow={false} key="1" >
                    <p>路人总归形形色色，但无论你是谁，都感谢你来到了这里 :)</p>
                    <p>作者<b>许洋溢</b>，<b>均远</b>是我的字（既加冠）。大学期间心思比较杂，自学过机器学习、前端、后端等知识(不敢精通)，现阶段主要努力方向在前端（恰饭）。搭建这个博客的初衷有二：一是学以致用，想将自己所学的各项杂技融会贯通付诸实践；二来自己也有分享的需求，有些所思所想不便直说，索性便借助博客自说自话（反正一两年内估计也没什么人看），就当是私人树洞</p>
                    <p>整个博客也是自己“纯手工打造”，亲自运维，作为经验缺乏的开发人员，博客肯定会有不少bug，目前而言也没有很明确的打算要把博客做成怎么样，更多是一种尝试，对于路人而言，大家看看对自己有帮助的文章也就够了。若是有心，发现bug啥的也欢迎与我联系，洋溢不胜感激。</p>
                    <p>曾在别人的博客中看到过许多优秀文章，有时候撞见一篇写到心坎里的文字，就像与多年未见的老友撞了个怀，欣喜若狂；洋溢自知才疏学浅，但每一篇文字都会认真对待，若发现知识有误，还望不吝赐教（可通过留言或者博客提供的社交账号联系我），若有幸能帮到屏幕前的你，聊以慰藉，也算皆大欢喜。</p>
                    <p>关于博客的内容，我不想做什么限制，自己也是个比较任性的人，以学习笔记为主，学的杂可能分享的也杂。将来日子稍稍安定下来，说不定还会分享一些美食烹饪相关，毕竟我还有个家庭掌厨的梦</p>
                </Panel>
                <Panel id="two"
                       header={<>我是酷酷的神秘人{<img src="/img/deepdark.png" alt=""/>}</>}
                       showArrow={false} key="2">
                    <p>Mysterium tu, ego sum magis et magis arcanum</p>
                    <p>أستطيع التحدث بلغات متعددة</p>
                    <p>Google翻訳を必要としないふり</p>
                    <p>Σας εύχομαι μια τεράστια ζωή</p>
                    <p>Je vous souhaite tout le meilleur</p>
                    <p>Être une minorité heureuse</p>
                    <p>We had a nice little talk</p>
                </Panel>
                <Panel id="three"
                       header={<>我是盯上你的大黑客{<img src="/img/paojio.png" alt=""/>}</>}
                       showArrow={false} key="3">
                    <p>其实有幸能被瞧上也是我的殊荣（作揖）</p>
                    <p>曾经出于好奇摸了摸网络安全的东西，到现在仍然感叹shodan的可怕，圈内老话说最安全的办法就是拔掉网线，而我这服务器基本没有特别留意过防线，相信黑客大佬轻轻松松便能拿下</p>
                    <p>只是我实在是穷，拿下了也无利可图，得不偿失，还请放过。若是网安的同学想做渗透测试练练手，倒是可以联系我，大家在合适范围内尝试、实践，一起学点知识</p>
                </Panel>
            </Collapse>
        </Wrapper>
    )
}

export default AboutMe;