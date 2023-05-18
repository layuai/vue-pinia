import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import axios from "axios";

export const useCounterStore = defineStore("counter", () => {
	// 定义数据（state）
	const count = ref(0);
	const API_URL = "http://geek.itheima.net/v1_0/channels";

	// 定义修改数据方法(action 同步+异步)
	const increment = () => {
		count.value++;
	};

	// getter方法
	const doubleCounter = computed(() => {
		return count.value * 2;
	});

	//定义异步action
	const list = ref([]);
	const getList = async () => {
		const res = await axios.get(API_URL);
		list.value = res.data.data.channels;
		console.log(list.value);
	};

	onMounted(() => {
		console.log("调用api");
		getList();
	});
	//以对象方式return供组件使用
	return {
		count,
		increment,
		doubleCounter,
		list,
		getList,
	};
});
