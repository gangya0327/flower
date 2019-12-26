<template>
    <div style="margin-top: 50px">
        <el-table :data="value.transports" style="width: 100%;margin-bottom: 10px;">
            <el-table-column label="目的地接/回车点" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.type | transportFormat }}</span>
                </template>
            </el-table-column>
            <el-table-column label="地点">
                <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.departurePlace }}</el-tag>到
                    <el-tag size="medium">{{ scope.row.destinationPlace }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="时间">
                <template slot-scope="scope">
                    <div style="width: 95px;">{{ scope.row.timeInfo | timeInfoFormat }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div v-if="scope.row.showStatus === 0">将被删除</div>
                    <div v-else>
                        <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-button
            type="primary"
            size="mini"
            style="margin-bottom: 20px;"
            @click="dialogTransportVisible = true"
        >添加接送信息</el-button>

        <el-form
            :model="value"
            :rules="rules"
            ref="productTripForm"
            label-width="150px"
            style="width: 800px"
            size="small"
        >
            <el-form-item label="接送紧急联系电话：" prop="transportUrgentTel">
                <el-input v-model="value.transportUrgentTel" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="目的地接团方式：">
                <el-input v-model="value.meetPlace" style="width: 300px"></el-input>（机场/车站/码头）
            </el-form-item>
            <el-form-item label="导游举：">
                <el-input v-model="value.meetSign" style="width: 300px"></el-input>导游旗或客人名接团
            </el-form-item>
            <el-form-item label="地接导游姓名：">
                <el-input v-model="value.localGuideName" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="地接导游手机：">
                <el-input v-model="value.localGuidePhone" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button size="medium" @click="handlePrev">上一步，填写开班基本信息</el-button>
                <el-button
                    type="primary"
                    size="medium"
                    @click="handleNext('productTripForm')"
                >下一步，填写班期价格</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="接送信息" :visible.sync="dialogTransportVisible" center width="650px">
            <el-form :model="transportForm">
                <el-form-item label="目的地接/回车点" :label-width="formLabelWidth">
                    <el-select
                        v-model="transportForm.type"
                        placeholder="请选择方式"
                        style="width: 165px;"
                    >
                        <el-option label="接" value="1"></el-option>
                        <el-option label="送" value="2"></el-option>
                        <el-option label="转场" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地点" :label-width="formLabelWidth">
                    <el-input
                        v-model="transportForm.departurePlace"
                        autocomplete="off"
                        style="width: 165px;"
                    ></el-input>到
                    <el-input
                        v-model="transportForm.destinationPlace"
                        autocomplete="off"
                        style="width: 165px;"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    :label-width="formLabelWidth"
                    v-for="(domain, index) in transportForm.timeInfo"
                    :label="'时间 ' + index"
                    :key="domain.key"
                    :prop="'timeInfo.' + index + '.time'"
                    :rules="{
            required: true, message: '接送时间不能为空', trigger: 'blur'
          }"
                >
                    <el-time-picker
                        is-range
                        v-model="domain.time"
                        format="HH:mm"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        prefix-icon="null"
                        style="width: 350px;padding: 3px 0;"
                    ></el-time-picker>
                    <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTransportVisible = false">取 消</el-button>
                <el-button @click="addTime">新增时间</el-button>
                <el-button type="primary" @click="addTransport()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { formatDate } from "@/utils/date";

export default {
    name: "GroupTripDetail",
    props: {
        value: Object,
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dialogTransportVisible: false,
            transportForm: {
                timeInfo: [
                    {
                        time: [
                            new Date(2019, 0, 1, 0, 0),
                            new Date(2019, 0, 1, 23, 59)
                        ]
                    }
                ],
                departurePlace: "",
                destinationPlace: "",
                type: ""
            },
            formLabelWidth: "120px",
            rules: {
                transportUrgentTel: [
                    {
                        required: true,
                        message: "请填写接送紧急联系电话",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {},
    computed: {},
    filters: {
        transportFormat(value) {
            //行程类型（1 - 接，2 - 送，3 - 转场）
            let transportStr = ["", "接", "送", "转场"];
            return transportStr[value];
        },
        timeInfoFormat(value) {
            let timeStr = "";
            if (value) {
                value.map((v, i) => {
                    let departureTime = new Date(v.departureTime);
                    let destinationTime = new Date(v.destinationTime);
                    timeStr += formatDate(departureTime, "hh:mm");
                    v.departureTimeParam = formatDate(departureTime, "hh:mm");
                    timeStr += " 至 ";
                    timeStr += formatDate(destinationTime, "hh:mm");
                    v.destinationTimeParam = formatDate(
                        destinationTime,
                        "hh:mm"
                    );
                });
            }
            return timeStr;
        }
    },
    methods: {
        addTime() {
            this.transportForm.timeInfo.push({
                time: [
                    new Date(2019, 0, 1, 0, 0),
                    new Date(2019, 0, 1, 23, 59)
                ],
                key: Date.now()
            });
        },
        removeDomain(item) {
            var index = this.transportForm.timeInfo.indexOf(item);
            if (index !== -1) {
                this.transportForm.timeInfo.splice(index, 1);
            }
        },
        addTransport() {
            let oTransport = {
                departurePlace: this.transportForm.departurePlace,
                destinationPlace: this.transportForm.destinationPlace,
                type: this.transportForm.type,
                timeInfo: []
            };
            this.transportForm.timeInfo.map((v, i) => {
                let otTimeInfo = {};
                otTimeInfo.departureTime = v.time[0];
                otTimeInfo.departureTimeParam = formatDate(
                    new Date(v.time[0]),
                    "HH-mm"
                );
                otTimeInfo.destinationTime = v.time[1];
                otTimeInfo.destinationTimeParam = formatDate(
                    new Date(v.time[1]),
                    "HH-mm"
                );
                oTransport.timeInfo.push(otTimeInfo);
            });
            this.value.transports.push(oTransport);
            this.dialogTransportVisible = false;
        },
        handleEdit(index, row) {
            this.transportForm.type = row.type;
            this.transportForm.departurePlace = row.departurePlace;
            this.transportForm.destinationPlace = row.destinationPlace;
            row.timeInfo.map(item => {
                let time = [item.departureTime, item.destinationTime];
                this.transportForm.timeInfo.push(time);
            });
            //this.transportForm = row;
            this.dialogTransportVisible = true;
        },
        handleDelete(index, row) {
            // this.value.transports.splice(index, 1);
            row.showStatus = 0; //0不展示，1展示
        },
        handlePrev() {
            this.$emit("prevStep");
        },
        handleNext(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$emit("nextStep");
                } else {
                    this.$message({
                        message: "验证失败",
                        type: "error",
                        duration: 1000
                    });
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
</style>
