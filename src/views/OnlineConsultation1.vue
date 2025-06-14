<!--
 * @Author: 刘洋
 * @Date: 2024-11-27 23:16:05
 * @LastEditTime: 2025-02-22 11:06:32
 * @Description: 
-->
<template>
    <div class="chat-bot-container">
        <div class="chat-window">
            <div class="messages">
                <div v-for="(message, index) in chatMessages" :key="index" class="message"
                    :class="{ 'sent-by-bot': !message.fromUser }">
                    <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                    <div class="message-content">
                        <span v-if="message.fromUser" class="user-message">{{ message.text }}</span>
                        <span v-else class="bot-message">{{ message.text }}</span>
                    </div>
                </div>
            </div>
            <div class="input-area">
                <input v-model="userInput" @keyup.enter="sendMessage" placeholder="请问你要咨询什么" />
                <button @click="sendMessage">发送</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
    setup() {
        const chatMessages = ref([]);
        const userInput = ref('');
        const botName = 'ChatBot';

        // 模拟发送消息给机器人
        const sendMessage = () => {
            if (userInput.value.trim()) {
                const timestamp = new Date().toLocaleTimeString();
                chatMessages.value.push({
                    text: userInput.value,
                    fromUser: true,
                    timestamp,
                });

                // 这里应该调用实际的机器人API来获取回复
                // 但为了演示，我们直接模拟一个回复
                setTimeout(() => {
                    const botMessage = `Bot: ${generateBotResponse(userInput.value)}`;
                    chatMessages.value.push({
                        text: botMessage,
                        fromUser: false,
                        timestamp: new Date().toLocaleTimeString(),
                    });

                    // 清空输入框
                    userInput.value = '';
                }, 1000); // 模拟网络延迟
            }
        };

        // 生成机器人的模拟回复（这里只是示例，实际应该根据用户输入生成有意义的回复）
        const generateBotResponse = (userMessage) => {
            const responses = [
                'Hello!',
                'How can I help you?',
                'What\'s up?',
                'Nice to meet you!',
                // 可以添加更多回复选项
            ];
            const randomIndex = Math.floor(Math.random() * responses.length);
            return responses[randomIndex];
        };

        // 格式化时间戳（这里只是简单示例，可以根据需要自定义格式）
        const formatTimestamp = (timestamp) => timestamp;

        // 可以在这里添加其他逻辑，比如监听窗口大小变化来调整布局等

        return {
            chatMessages,
            userInput,
            sendMessage,
            formatTimestamp,
            botName, // 虽然在这个示例中没有直接使用，但可以作为后续扩展的预留属性
        };
    },
};
</script>

<style scoped>
.chat-bot-container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat-window {
    height: 400px;
    position: relative;
    overflow-y: auto;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
}

.messages {
    display: flex;
    flex-direction: column;
}

.message {
    display: flex;
    margin-bottom: 10px;
}

.sent-by-bot .message-content {
    justify-content: flex-end;
}

.sent-by-bot .timestamp {
    order: 2;
    margin-left: 10px;
}

.sent-by-bot {
    justify-content: end;
}

.from-user .message-content {
    justify-content: flex-start;
    background-color: #e0e0e0;
    border-radius: 15px;
    padding: 10px;
}

.from-user .timestamp {
    order: 1;
    margin-right: 10px;
}

.timestamp {
    font-size: 0.875em;
    color: #777;
    order: 0;
    /* Reset order for flexbox layout */
    margin-right: 12px;
    margin-top: 10px;
}

.message-content {
    display: flex;
    align-items: center;
}

.user-message,
.bot-message {
    margin: 0;
    background-color: #dcf8c6;
    border-radius: 15px;
    padding: 9px;
}

.input-area {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #eee;
}

input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    border: none;
    background-color: #28a745;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
}

button:hover {
    background-color: #218838;
}
</style>