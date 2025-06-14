<!--
 * @Author: 刘洋
 * @Date: 2024-11-27 23:16:05
 * @LastEditTime: 2025-02-22 11:10:30
 * @Description: 
-->
<template>
    <div class="chat-container">
        <div class="chat-header">
            <h2 class="header-title">在线咨询</h2>
        </div>
        <div class="chat-messages">
            <div v-for="(message, index) in chatMessages" :key="index"
                :class="['message', message.fromUser ? 'user-message' : 'bot-message']">
                <div class="avatar">
                    <el-avatar :src="message.fromUser ? avatars.user : avatars.doctor" />
                    <!-- <el-avatar src="src\assets\images\user.png" /> -->
                </div>
                <div class="message-content">
                    <div class="message-inner">
                        <div class="message-text">{{ message.text }}</div>
                        <div class="message-timestamp">{{ message.timestamp }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-input-container">
            <input v-model="userInput" @keyup.enter="sendMessage" placeholder="请问你要咨询什么..." class="chat-input" />
            <button @click="sendMessage" class="send-button">发送</button>
        </div>
    </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import OpenAI from 'openai';

export default {
    setup() {
        const chatMessages = ref([]);
        const userInput = ref('');
        const botName = '医生';

        // 使用相对路径
        const avatars = ref({
            user: 'src/assets/images/user.png',
            doctor: 'src/assets/images/doctor.png'
        });

        // 修改为 Baichuan API 配置
        const openai = new OpenAI({
            baseURL: 'https://api.baichuan-ai.com/v1',
            apiKey: 'sk-af6655c76ea3c104d30266995e1eeb98',  // 请替换为您的 API key
            dangerouslyAllowBrowser: true,
        });

        const sendMessage = async () => {
            if (userInput.value.trim()) {
                const userMessage = {
                    text: userInput.value,
                    fromUser: true,
                    timestamp: new Date().toLocaleTimeString(),
                    avatar: avatars.user
                };
                chatMessages.value.push(userMessage);

                try {
                    const completion = await openai.chat.completions.create({
                        model: 'Baichuan2-Turbo',
                        messages: [
                            {
                                role: 'system',
                                content: '你是一位专业的医生助手。请只回答与医疗健康相关的问题。如果用户询问与医疗无关的问题，请礼貌地提醒他们这是一个医疗咨询平台。保持专业、严谨的态度，使用平易近人的语言。不要给出具体的诊断和用药建议，而是提供一般性的健康建议和指导。对于严重的症状，建议用户及时就医。'
                            },
                            { role: 'user', content: userInput.value }
                        ],
                        temperature: 0.3,
                        stream: false
                    });

                    const botMessage = {
                        text: completion.choices[0].message.content,
                        fromUser: false,
                        timestamp: new Date().toLocaleTimeString(),
                        avatar: avatars.doctor
                    };
                    chatMessages.value.push(botMessage);
                } catch (error) {
                    console.error('API Error:', error);
                    let errorMessage = botName + '：抱歉，我遇到了一个错误。请稍后再试。';
                    if (error.status === 402) {
                        errorMessage = botName + '：余额不足。请给您的帐户充值。';
                    }
                    chatMessages.value.push({
                        text: errorMessage,
                        fromUser: false,
                        timestamp: new Date().toLocaleTimeString(),
                        avatar: avatars.doctor
                    });
                }

                userInput.value = '';
            }
        };

        return {
            chatMessages,
            userInput,
            sendMessage,
            botName,
            avatars,
        };
    },
};


</script>

<style scoped>
.chat-container {
    width: calc(100% - 20px);
    /* 保持左右边距不变 */
    max-width: 920px;
    /* 从 820px 改为 920px */
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: calc(100% - 45px);
    /* 从 40px 改为 45px */
    min-height: 395px;
    /* 从 400px 改为 395px */
    max-height: calc(100vh - 165px);
    /* 从 160px 改为 165px */
    padding: 0;
    margin: 20px auto;
    /* 使用 auto 实现水平居中 */
    border: 1px solid #eee;
    border-radius: 8px;
    position: relative;
}

.chat-header {
    padding: 10px 16px;
    background-color: #f0f0f0; /* 背景颜色 */
    border-bottom: 1px solid #ddd; /* 底部边框 */
    display: flex;
    align-items: center;
    gap: 10px; /* 头像和标题之间的间距 */
}

.header-avatar {
    width: 40px; /* 头像大小 */
    height: 40px;
}

.header-title {
    font-size: 18px; /* 标题字体大小 */
    color: #333; /* 标题颜色 */
    margin: 0; /* 去掉默认的 margin */
}

.chat-messages {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    /* 只允许垂直滚动 */
    overflow-x: hidden;
    /* 禁止水平滚动 */
    background-color: #f7f7f7;
}

/* 优化滚动条样式 */
.chat-messages::-webkit-scrollbar {
    width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-track {
    background-color: transparent;
}

.message {
    margin-bottom: 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    /* 头像和消息之间的间距 */
}

.avatar {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;
    background-color: #f0f0f0;
    /* 添加背景色，防止图片加载前的空白 */
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* 改为 contain 以确保图标完整显示 */
}

.user-message {
    flex-direction: row-reverse;
    /* 用户消息靠右，头像在右边 */
}

.message-content {
    display: inline-block;
    max-width: calc(60% - 52px);
    /* 考虑头像宽度和间距 */
    min-width: 50px;
    padding: 10px 16px;
    border-radius: 18px;
    position: relative;
    font-size: 14px;
    line-height: 1.4;
}

.message-inner {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.message-text {
    flex: 1;
    word-wrap: break-word;
    white-space: pre-wrap;
    padding-top: 2px;
}

.message-timestamp {
    font-size: 12px;
    color: #999;
    white-space: nowrap;
    margin-top: 4px;
}

.user-message .message-content {
    background-color: #95ec69;
    color: #000000;
    border-top-right-radius: 4px;
    /* 靠近头像的一角变小 */
}

.bot-message .message-content {
    background-color: #ffffff;
    color: #000000;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-top-left-radius: 4px;
    /* 靠近头像的一角变小 */
}

.chat-input-container {
    display: flex;
    padding: 10px;
    /* 稍微减小内边距 */
    background-color: #f7f7f7;
    border-top: 1px solid #eee;
    height: 60px;
    /* 固定底部输入区域高度 */
    align-items: center;
}

.chat-input {
    flex: 1;
    padding: 10px 16px;
    border: none;
    border-radius: 24px;
    margin-right: 8px;
    background-color: #ffffff;
    font-size: 14px;
}

.chat-input:focus {
    outline: none;
}

.send-button {
    padding: 8px 24px;
    background-color: #07c160;
    color: white;
    border: none;
    border-radius: 24px;
    cursor: pointer;
    font-size: 14px;
}

.send-button:hover {
    background-color: #06ae56;
}
</style>